/**
 * Initializes focus trap with custom container and selector
 * @param {HTMLElement} [container] - Container element to scope the focus trap
 * @param {string} [selector] - CSS selector for focusable elements (optional)
 * @returns {void}
 *
 * @description When no selector provided, uses default:
 * 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1")]'
 */
export function initFocusTrap(container?: HTMLElement, selector?: string): void
