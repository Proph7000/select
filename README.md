# High-Performance React Select Component

A modern, accessible, and high-performance select component built with React and TypeScript. This project demonstrates advanced select functionality optimized for handling large datasets while maintaining excellent user experience.

## 🚀 Project Overview

This project showcases a production-ready select component that can efficiently handle datasets with 100,000+ options. Built with modern React patterns, it provides smooth performance, accessibility features, and comprehensive keyboard navigation.

### Key Features

- **High Performance**: Optimized for large datasets
- **Accessibility First**: ARIA-compliant with screen reader support
- **Keyboard Navigation**: Full keyboard support for power users
- **Search Functionality**: Fast search with debounced input
- **Responsive Design**: Adapts to different screen sizes
- **TypeScript**: Full type safety and IntelliSense support

## 🎯 Select Component Features

### Core Functionality

- **Option Selection**: Single selection with controlled state
- **Placeholder Support**: Customizable placeholder text
- **Label Integration**: Accessible labels for form integration
- **Disabled State**: Support for disabled select components
- **Auto-focus**: Configurable auto-focus behavior

### Advanced Navigation

- **Arrow Keys**: Navigate through options with ↑/↓
- **Home/End**: Jump to first/last option
- **Page Up/Down**: Navigate by visible items count
- **Type to Search**: Instant search through options
- **Focus Management**: Proper focus handling and restoration

### Performance Optimizations

- **Debounced Search**: 700ms delay for optimal performance
- **Efficient Rendering**: Minimal re-renders with controlled state
- **Window Resize Observer**: Responsive positioning updates
- **Virtualization Ready**: Prepared for large dataset optimization

### Accessibility Features

- **ARIA Compliance**: Proper ARIA attributes and roles
- **Screen Reader Support**: Full keyboard navigation support
- **Focus Indicators**: Clear visual focus states
- **Semantic HTML**: Proper HTML structure and semantics

### Customization Options

- **Styling**: Custom CSS classes and inline styles
- **Positioning**: Configurable options positioning
- **Width Control**: Full-width or auto-width options
- **Theme Support**: Flexible styling system

## 🛠️ Technical Implementation

### Architecture

- **Component Structure**: Modular, reusable components
- **State Management**: Controlled component pattern
- **Hook-based Logic**: Custom hooks for specific functionality
- **Type Safety**: Comprehensive TypeScript interfaces

### Key Hooks

- `useSelectSearch`: Handles search functionality with debouncing
- `useHandleKeyDown`: Manages keyboard navigation
- `useWindowResizeObserver`: Handles responsive positioning
- `useDebounce`: Optimizes search performance

### Performance Considerations

- **Debounced Input**: Prevents excessive API calls
- **Efficient State Updates**: Minimal re-renders
- **Memory Management**: Proper cleanup and memory handling
- **Smooth Scrolling**: Optimized scroll behavior

## 📱 Usage Examples

### Basic Usage

```tsx
<Select
  options={options}
  placeholder='Choose an option'
  label='Select Option'
  value={selectedValue}
  onChange={setSelectedValue}
/>
```

### With Large Dataset

```tsx
<Select
  options={largeDataset} // 100,000+ options
  placeholder='Choose option'
  label='Large Dataset Select'
  visibleItems={10}
  fullWidth
/>
```

### API Integration

```tsx
<Select
  options={apiData}
  placeholder='Choose name'
  label='Name List (from API)'
  fullWidth
  value={selectedValue}
  onChange={setSelectedValue}
  disabled={!apiData?.length}
/>
```

## 🔧 Configuration Options

### Props Interface

```typescript
interface ISelectProps {
  options: ISelectOption[]
  value?: ISelectOption | null
  onChange?: (option: ISelectOption) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  visibleItems?: number
  autoFocus?: boolean
  // ... and more
}
```

### Styling Options

- `selectClassName`: Custom CSS class for select container
- `selectOptionsClassName`: Custom CSS class for options list
- `selectStyles`: Inline styles for select container
- `selectOptionsStyles`: Inline styles for options list

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm
- React 18+
- TypeScript 4.5+

### Back4App Setup for Local Development

**Important:** For local development and testing with the names API, you need to create your own test application on [Back4App](https://www.back4app.com/database/back4app/list-of-names-dataset/get-started/javascript/rest-api/fetch?objectClassSlug=all-names).

The production API keys are stored in GitHub Actions secrets and are only available during deployment. To run locally:

1. Visit [Back4App List of Names Dataset](https://www.back4app.com/database/back4app/list-of-names-dataset/get-started/javascript/rest-api/fetch?objectClassSlug=all-names)
2. Click "I want to use a fake app (test purposes only)" or create your own app
3. Get your application keys (Application ID and REST API Key)
4. Update the API configuration in your local environment

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd select

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Development

```bash
# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm type-check
```

## 🎨 Customization

### CSS Variables

The component uses CSS custom properties for easy theming:

```css
:root {
  --select-border-color: #ccc;
  --select-focus-color: #007bff;
  --select-hover-color: #f8f9fa;
}
```

### Component Composition

The select is built from smaller, composable components:

- `SelectInput`: Main input field
- `SelectOptions`: Options dropdown
- `SelectOption`: Individual option items

## 🔍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions and support, please open an issue in the repository.
