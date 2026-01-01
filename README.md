# focus-trap-lite

[![npm version](https://img.shields.io/npm/v/focus-trap-lite.svg)](https://www.npmjs.com/package/focus-trap-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WAI-ARIA Compliant](https://img.shields.io/badge/WAI--ARIA-Compliant-blue)](https://www.w3.org/WAI/standards-guidelines/aria/)

Lightweight (≤2kB) focus trapping utility for implementing accessible keyboard navigation constraints in modal dialogs, sidebars, and other contained UI components.

## Features

- ✅ Full WAI-ARIA compliance for accessibility
- ✅ Tiny footprint (ES6 module)
- ✅ Zero dependencies
- ✅ Flexible focus control
- ✅ Automatic cleanup
- ✅ TypeScript support

## Installation

```bash
npm install focus-trap-lite
```

## Usage

### Basic Implementation

```javascript
import { initFocusTrap } from 'focus-trap-lite'

// Initialize trap on modal open
function openModal() {
  const trap = initFocusTrap(modalElement)

  // Add your modal opening logic

  // Clean up manually if needed
  // trap.destroy()
}

// Trap automatically cleans up when:
// - User closes modal (Escape key)
// - Focus escapes trap boundaries (if logic allows)
// - Component unmounts
```

### Advanced Configuration

```javascript
// Container element with custom selector and options
initFocusTrap(document.querySelector('#modal-container'), '.custom-focusable', {
  focus: true, // Auto-focus on initialization
  firstFocusableElement: '#first-input', // Specific start element
})

// Nested Modals support
// The library maintains a stack of active traps.
// When a new trap is initialized, it takes precedence.
// When destroyed (e.g. via Escape), focus control returns to the previous trap.
```

## API

### initFocusTrap(element?, selector?, options?)

| Parameter                     | Type                  | Description                                                                                             |
| ----------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| element                       | `Element`             | _(Optional)_ DOM element to scope the focus trap. When omitted, uses document.body                      |
| selector                      | `string`              | _(Optional)_ CSS selector for focusable elements within container. Default: standard focusable elements |
| options                       | `Object`              | _(Optional)_ Configuration object                                                                       |
| options.focus                 | `boolean`             | Auto-focus the first element on initialization. Default: `false`                                        |
| options.firstFocusableElement | `HTMLElement\|string` | Element to focus initially. Can be a selector string or DOM element.                                    |

**Returns:**

```javascript
{
  destroy: () => void,     // Manually destroy the trap
  container: HTMLElement   // The container element
}
```

**Behavior:**

- Creates keyboard navigation constraints (Tab / Shift+Tab)
- Handles boundary focus wrapping
- **Nested Traps:** Supports multiple stacked traps (LIFO)
- **Auto Cleanup:**
  - On `Escape` key press
  - When calling `destroy()`
  - When calling function returns (if implicit, though manual destroy is recommended for SPAs)
- **Smart Filtering:** Ignores hidden, invisible, or `tabindex="-1"` elements

## Changelog

### v0.1.0

- **Breaking Change:** `initFocusTrap` now returns an object `{ destroy, container }` instead of `void`.
- **New Feature:** Added `options` parameter.
  - `options.focus`: Auto-focus support.
  - `options.firstFocusableElement`: Custom initial focus target.
- **New Feature:** Nested focus traps support (Stack-based).
- **New Feature:** `Escape` key support for closing the trap.
- **Improvement:** Better filtering of non-focusable elements (hidden, zero-size, `tabindex="-1"`).
- **Improvement:** Optimized internal logic and variable naming.

## Browser Support

Modern browsers with ES6 support:

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png" alt="Chrome" width="24" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png" alt="Firefox" width="24" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png" alt="Safari" width="24" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 88+                                                                                                                                                                                         | 78+                                                                                                                                                                                             | 14.1+                                                                                                                                                                                       |

For legacy browser support, add Array.prototype.at() polyfill.

## Contributing

1. Fork the repository
2. Clone your fork

```bash
git clone https://github.com/your-username/focus-trap-lite.git
```

3. Install dependencies

```bash
npm install
```

4. Create feature branch

```bash
git checkout -b feature/your-feature
```

5. Commit changes
6. Push to branch
7. Create Pull Request

## License

MIT © [Pipecraft](https://www.pipecraft.net)

---

📝 Report issues on [GitHub](https://github.com/utags/focus-trap-lite/issues)

## >\_

[![Pipecraft](https://img.shields.io/badge/site-pipecraft-brightgreen)](https://www.pipecraft.net)
[![UTags](https://img.shields.io/badge/site-UTags-brightgreen)](https://github.com/utags)
