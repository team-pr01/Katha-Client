import React from 'react';

interface InterestSelectorProps {
  selected: string[];
  onToggle: (interestId: string) => void;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({ selected, onToggle }) => {
  const interests: any[] = [
    { id: 'jewelry', label: 'Jewelry', icon: '💍' },
    { id: 'homeDecor', label: 'Home Decor', icon: '🏠' },
    { id: 'art', label: 'Art & Craft', icon: '🎨' },
    { id: 'fashion', label: 'Fashion Accessories', icon: '👔' },
    { id: 'spiritual', label: 'Spiritual', icon: '🕉️' },
    { id: 'personalized', label: 'Personalized Items', icon: '✏️' },
    { id: 'traditional', label: 'Traditional', icon: '🎭' },
    { id: 'modern', label: 'Modern', icon: '💫' },
    { id: 'luxury', label: 'Luxury', icon: '✨' },
    { id: 'ecoFriendly', label: 'Eco-Friendly', icon: '🌿' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest) => (
        <button
          key={interest.id}
          type="button"
          onClick={() => onToggle(interest.id)}
          className={`
            px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all
            ${selected.includes(interest.id)
              ? 'border-primary-10 bg-primary-10/10 text-primary-10'
              : 'border-neutral-50 text-neutral-35 hover:border-primary-10 hover:text-primary-10'
            }
          `}
        >
          <span className="mr-1">{interest.icon}</span>
          {interest.label}
        </button>
      ))}
    </div>
  );
};

export default InterestSelector;