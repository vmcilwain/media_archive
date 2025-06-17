import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  variant?: 'button' | 'text';
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick: Function;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  external = false,
  className = '',
  variant = 'text',
  disabled = false,
  target,
  rel,
  onClick
}) => {
  // Auto-detect external links
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  // Build CSS classes
  const baseClasses = variant === 'button' ? 'button' : '';
  const disabledClass = disabled ? 'is-disabled' : '';
  const finalClassName = [baseClasses, className, disabledClass].filter(Boolean).join(' ');

  // Common props for both internal and external links
  const commonProps = {
    className: finalClassName,
    ...(target && { target }),
    ...(rel && { rel }),
    ...(disabled && { 'aria-disabled': true }),
  };

  // Handle click for disabled links
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (isExternal) {
    return (
      <a
        href={disabled ? undefined : href}
        {...commonProps}
        rel={rel || 'noopener noreferrer'}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // Render internal link using React Router
  return (
    <RouterLink
      to={disabled ? '/' : href}
      {...commonProps}
      onClick={handleClick}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
export type { LinkProps };

{/* Link Component Examples 
<div className="box mb-5">
  <h3 className="title is-4">Link Component Examples</h3>
  <div className="content">
    <p>Here are some examples of the Link component in action:</p>
    <div className="buttons">
      <Link href="/add-media" className="button is-primary">
        Add New Media
      </Link>
      <Link href="/settings" variant="button" className="is-info">
        Settings
      </Link>
      <Link href="https://example.com" target="_blank" className="button is-link">
        External Link
      </Link>
      <Link href="/disabled-link" disabled className="button is-warning">
        Disabled Link
      </Link>
    </div>
    <p>Text links:</p>
    <p>
      <Link href="/home">Home</Link> | 
      <Link href="/about"> About</Link> | 
      <Link href="mailto:contact@example.com"> Contact Us</Link> | 
      <Link href="https://github.com" target="_blank"> GitHub</Link>
    </p>
  </div>
</div> */}
