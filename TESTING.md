# Testing Setup

This project uses Jest and React Testing Library for testing React components.

## Running Tests

### Run all tests once

```bash
docker-compose exec web yarn test
```

### Run tests in watch mode

```bash
docker-compose exec web yarn test:watch
```

### Run tests with coverage

```bash
docker-compose exec web yarn test --coverage
```

## Test Structure

Tests are located in `app/javascript/components/__tests__/` directory and follow the naming convention `*.test.tsx`.

## Dependencies

- **Jest**: Testing framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/user-event**: User interaction simulation
- **ts-jest**: TypeScript support for Jest
- **jest-environment-jsdom**: DOM environment for testing React components

## Configuration

- `jest.config.js`: Main Jest configuration
- `jest.setup.js`: Test setup file that imports jest-dom matchers
- `app/javascript/types/jest-dom.d.ts`: TypeScript declarations for jest-dom matchers

## Table Component Tests

The Table component has comprehensive tests covering:

- Basic rendering and structure
- Header rendering
- Data rendering with different data types
- Empty data handling
- Custom CSS classes
- Custom render functions
- Column styling (width and alignment)
- Render function parameter passing

All tests verify both functionality and accessibility by using semantic queries like `getByRole`, `getByText`, etc.
