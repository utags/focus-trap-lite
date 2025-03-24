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
  initFocusTrap(modalElement, '.focusable')
  // Add your modal opening logic
}

// Trap automatically cleans up when:
// - User closes modal
// - Focus escapes trap boundaries
// - Component unmounts
```

### Advanced Configuration

```javascript
// Container element with custom selector
initFocusTrap(document.querySelector('#modal-container'), '.custom-focusable')

// Custom selector for focusable elements
initFocusTrap(null, '#modal .focusable')

// Container element with default selector
initFocusTrap(document.querySelector('.sidebar'))

// Default selector includes standard focusable elements:
// 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
```

## API

### initFocusTrap(container?, selector?)

| Parameter | Type      | Description                                                                                             |
| --------- | --------- | ------------------------------------------------------------------------------------------------------- |
| container | `Element` | _(Optional)_ DOM element to scope the focus trap. When omitted, uses document.body                      |
| selector  | `string`  | _(Optional)_ CSS selector for focusable elements within container. Default: standard focusable elements |

**Behavior:**

- Creates keyboard navigation constraints
- Handles boundary focus wrapping
- Automatic cleanup triggers:
  - When trapped container is removed from DOM
  - When calling function returns
  - On Escape key press
- Dynamic element support
- Focus restoration
- ARIA role management

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
