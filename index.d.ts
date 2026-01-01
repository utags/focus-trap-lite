/**
 * Initializes focus trap with custom container and selector
 * @param {HTMLElement} [container] - Container element to scope the focus trap
 * @param {string} [selector] - CSS selector for focusable elements (optional)
 * @param {Object} [options] - Options for focus trap
 * @returns {Object} - Object containing destroy method
 *
 * @description When no selector provided, uses default:
 * 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1")]'
 */
export function initFocusTrap(
  container?: HTMLElement,
  selector?: string,
  options?: {
    firstFocusableElement?: HTMLElement | string
    focus?: boolean
  }
): {
  destroy: () => void
  container: HTMLElement | Document
}
