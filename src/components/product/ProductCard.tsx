import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: {
    text: string;
    type: 'new' | 'sale' | 'bestseller' | 'limited';
  };
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  imageUrl,
  badge
}: ProductCardProps) {
  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'new':
        return 'bg-tertiary-container text-on-tertiary-container';
      case 'sale':
        return 'bg-error-container text-on-error-container';
      case 'bestseller':
        return 'bg-primary text-on-primary';
      case 'limited':
        return 'bg-error text-on-error';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="product-card group flex flex-col bg-surface border border-outline-variant/30 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-surface-container-high">
        <img 
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <button className="quick-add-btn absolute bottom-3 left-3 right-3 bg-primary text-on-primary py-2.5 rounded-lg font-label-md flex items-center justify-center gap-2 opacity-0 translate-y-4 transition-all duration-300 hover:bg-surface-tint active:scale-95 shadow-md">
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          Add to Cart
        </button>
        {badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold tracking-wider ${getBadgeStyles(badge.type)}`}>
            {badge.text}
          </span>
        )}
      </div>
      <div className="p-stack-md flex flex-col flex-grow">
        <span className="text-label-sm text-outline mb-1">{category}</span>
        <h3 className="font-body-md text-on-surface font-semibold mb-stack-xs line-clamp-1">{name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-body-lg font-bold text-primary">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-label-sm text-outline line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
