import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Link from '../Link';

// Helper to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Link Component', () => {
  it('renders internal link with React Router Link', () => {
    renderWithRouter(<Link href="/test">Internal Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Internal Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders external link with anchor tag', () => {
    renderWithRouter(<Link href="https://example.com">External Link</Link>);
    
    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('auto-detects external links', () => {
    renderWithRouter(<Link href="mailto:test@example.com">Email Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Email Link' });
    expect(link).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('applies button variant styling', () => {
    renderWithRouter(<Link href="/test" variant="button">Button Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Button Link' });
    expect(link).toHaveClass('button');
  });

  it('applies custom className', () => {
    renderWithRouter(<Link href="/test" className="custom-class">Custom Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Custom Link' });
    expect(link).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    renderWithRouter(<Link href="/test" disabled>Disabled Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Disabled Link' });
    expect(link).toHaveClass('is-disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('prevents navigation when disabled', () => {
    renderWithRouter(<Link href="/test" disabled>Disabled Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Disabled Link' });
    fireEvent.click(link);
    
    // For internal links, disabled links should have href="/"
    expect(link).toHaveAttribute('href', '/');
  });

  it('opens external links in new tab when target="_blank"', () => {
    renderWithRouter(
      <Link href="https://example.com" target="_blank">
        External Link
      </Link>
    );
    
    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses custom rel attribute when provided', () => {
    renderWithRouter(
      <Link href="https://example.com" rel="custom-rel">
        External Link
      </Link>
    );
    
    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toHaveAttribute('rel', 'custom-rel');
  });
});
