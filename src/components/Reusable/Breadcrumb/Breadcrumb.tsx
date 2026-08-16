import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
  homeLabel?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = '',
  homeLabel = 'Home',
}) => {
  // If no items provided, show default home
  const breadcrumbItems = items.length > 0 ? items : [{ label: homeLabel, path: '/' }];

  return (
    <nav
      className={`flex items-center gap-2 text-sm mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-neutral-45" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="text-neutral-45 hover:text-primary-10 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-neutral-10 font-medium' : 'text-neutral-45'}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;