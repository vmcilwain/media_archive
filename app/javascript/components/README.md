# Link Component

A flexible and accessible Link component for React applications that supports both internal navigation (using React Router) and external links.

## Features

- **Automatic Link Detection**: Automatically detects external URLs, email addresses, and phone numbers
- **React Router Integration**: Uses React Router's Link component for internal navigation
- **Bulma CSS Support**: Integrates seamlessly with Bulma CSS framework
- **Accessibility**: Includes proper ARIA attributes and semantic HTML
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Disabled State**: Supports disabled links with proper handling
- **Security**: Automatically adds `rel="noopener noreferrer"` for external links

## Usage

### Basic Internal Link

```tsx
import Link from "../components/Link";

<Link href="/dashboard">Go to Dashboard</Link>;
```

### External Link

```tsx
<Link href="https://example.com" target="_blank">
  Visit Example.com
</Link>
```

### Button Style Link

```tsx
<Link href="/settings" variant="button" className="is-primary">
  Settings
</Link>
```

### Disabled Link

```tsx
<Link href="/restricted" disabled>
  Restricted Access
</Link>
```

### Email and Phone Links

```tsx
<Link href="mailto:contact@example.com">Contact Us</Link>
<Link href="tel:+1234567890">Call Us</Link>
```

## Props

| Prop        | Type                 | Default      | Description                                                                 |
| ----------- | -------------------- | ------------ | --------------------------------------------------------------------------- |
| `href`      | `string`             | **required** | The destination URL or path                                                 |
| `children`  | `React.ReactNode`    | **required** | The content to display inside the link                                      |
| `external`  | `boolean`            | `false`      | Force the link to be treated as external                                    |
| `className` | `string`             | `''`         | Additional CSS classes to apply                                             |
| `variant`   | `'button' \| 'text'` | `'text'`     | Style variant - button adds Bulma button classes                            |
| `disabled`  | `boolean`            | `false`      | Whether the link should be disabled                                         |
| `target`    | `string`             | `undefined`  | Target attribute for the link (e.g., `_blank`)                              |
| `rel`       | `string`             | `undefined`  | Custom rel attribute (defaults to `noopener noreferrer` for external links) |

## Auto-Detection

The component automatically detects external links based on the `href` prop:

- URLs starting with `http` or `https`
- Email addresses starting with `mailto:`
- Phone numbers starting with `tel:`

External links automatically get `rel="noopener noreferrer"` for security unless a custom `rel` prop is provided.

## Styling

The component integrates with Bulma CSS:

- Use `variant="button"` to style as a Bulma button
- Add Bulma classes via the `className` prop
- Disabled state adds the `is-disabled` class

### Examples with Bulma Classes

```tsx
{
  /* Primary button link */
}
<Link href="/create" variant="button" className="is-primary">
  Create New
</Link>;

{
  /* Small danger button */
}
<Link href="/delete" variant="button" className="is-small is-danger">
  Delete
</Link>;

{
  /* Text link with custom styling */
}
<Link href="/help" className="has-text-info">
  Need Help?
</Link>;
```

## Accessibility

The component includes proper accessibility features:

- Uses semantic HTML (`<a>` tags for external links, React Router `Link` for internal)
- Adds `aria-disabled="true"` for disabled links
- Prevents navigation when disabled
- Includes proper `rel` attributes for external links

## Testing

The component includes comprehensive tests covering:

- Internal vs external link rendering
- Auto-detection of external URLs
- Button variant styling
- Disabled state handling
- Custom className application
- Target and rel attribute handling

Run tests with:

```bash
yarn test --testPathPattern=Link.test.tsx
```
