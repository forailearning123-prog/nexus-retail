"use client";

import { useState, useRef } from "react";

export default function CMSPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage(null);

    try {
      // 1. Get Presigned URL
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // 2. Upload to R2 directly using PUT
      const uploadRes = await fetch(data.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Failed to upload to storage");

      setMessage({ type: 'success', text: `Successfully uploaded ${file.name} to CMS!` });
      setFile(null);
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', text: error.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-stack-lg max-w-3xl mx-auto space-y-stack-lg">
      <div>
        <h1 className="font-headline-md text-headline-md font-bold mb-2">Content Management</h1>
        <p className="text-on-surface-variant">Update marketing banners, home page features, and store assets.</p>
      </div>

      <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm space-y-6">
        <h2 className="font-headline-sm text-headline-sm">Marketing Assets Upload</h2>
        
        {message && (
          <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-error-container text-on-error-container' : 'bg-tertiary-container text-on-tertiary-container'}`}>
            {message.text}
          </div>
        )}

        <form 
          onDragEnter={handleDrag} 
          onSubmit={(e) => e.preventDefault()}
          className="relative"
        >
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleChange} 
          />
          
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">cloud_upload</span>
            <p className="font-label-md text-lg mb-2">Drag and drop your asset here</p>
            <p className="text-body-sm text-on-surface-variant mb-4">Support for JPG, PNG, WEBP (Max 5MB)</p>
            
            <button 
              type="button" 
              onClick={onButtonClick}
              className="px-6 py-2 bg-surface text-on-surface border border-outline-variant rounded-lg font-label-md hover:bg-surface-container-high transition-colors"
            >
              Select File
            </button>
          </div>

          {dragActive && (
            <div 
              className="absolute inset-0 z-10" 
              onDragEnter={handleDrag} 
              onDragLeave={handleDrag} 
              onDragOver={handleDrag} 
              onDrop={handleDrop} 
            />
          )}
        </form>

        {file && (
          <div className="p-4 bg-surface-container border border-outline-variant rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="material-symbols-outlined text-primary">image</span>
              <span className="font-label-sm truncate">{file.name}</span>
            </div>
            <button 
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:brightness-110 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  Uploading...
                </>
              ) : (
                'Upload Asset'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
