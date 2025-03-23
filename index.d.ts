/**
 * Initializes focus trap with custom selector and container
 * @param {string} [selector] - CSS selector for focusable elements (optional)
 * @param {HTMLElement} [container] - Container element to scope the focus trap
 * @returns {void}
 *
 * @description When no selector provided, uses default:
 * 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1")]'
 */
export function initFocusTrap(selector?: string, container?: HTMLElement): void

/**
 * Initializes focus trap with container
 * @param {HTMLElement} [container] - Container element to scope the focus trap
 * @returns {void}
 *
 * @description When no selector provided, uses default:
 * 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1")]'
 */
export function initFocusTrap(container: HTMLElement): void
