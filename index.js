const focusTrapStack = []

/**
 * Initializes focus trap with custom container and selector
 * @param {Object} [container] - Container element to scope the focus trap
 * @param {string} [selector] - CSS selector for focusable elements (optional)
 * @param {Object} [options] - Options for focus trap
 * @param {HTMLElement|string} [options.firstFocusableElement] - The first element to focus (or selector).
 * @param {boolean} [options.focus] - Whether to focus on the first element on initialization. Default false.
 * @returns {void}
 *
 * @description When called with single parameter:
 * - Default selector: 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
 */
export function initFocusTrap(element, selector, options) {
  const trapId = Symbol('focusTrap')
  focusTrapStack.push(trapId)

  let root = element || document
  let query =
    selector || 'a[href], button, input, textarea, select, details, [tabindex]'
  let first
  let last
  let active = false

  const getInitial = () => {
    let target = first

    if (options?.firstFocusableElement) {
      if (typeof options.firstFocusableElement === 'string') {
        const found = root.querySelector(options.firstFocusableElement)
        if (found) {
          target = found
        }
      } else if (
        typeof options.firstFocusableElement === 'object' &&
        root.contains(options.firstFocusableElement)
      ) {
        target = options.firstFocusableElement
      }
    }

    return target
  }

  const scan = () => {
    const list = Array.from(root.querySelectorAll(query)).filter((element) => {
      if (element.disabled === true) return false
      if (element.tabIndex === -1) return false
      if (
        element.offsetWidth === 0 &&
        element.offsetHeight === 0 &&
        element.getClientRects().length === 0
      )
        return false
      if (
        globalThis.getComputedStyle(element).visibility === 'hidden' ||
        globalThis.getComputedStyle(element).display === 'none'
      )
        return false
      return true
    })
    first = list[0]
    last = list[list.length - 1]

    if (!first || !last || !document.contains(first)) {
      destroy()
    }
  }

  const init = () => {
    scan()
    if (options?.focus) {
      const target = getInitial()
      if (target) target.focus()
    }
  }

  const onKey = (event) => {
    if (
      focusTrapStack.length > 0 &&
      focusTrapStack[focusTrapStack.length - 1] !== trapId
    ) {
      return
    }

    if (event.key === 'Tab') {
      scan()

      if (!first || !last) {
        destroy()
        return
      }

      const activeElement = document.activeElement
      const isLoseFocus = !root.contains(activeElement)

      if (event.shiftKey) {
        if (activeElement === first || isLoseFocus) {
          last.focus()
          event.preventDefault()
        }
      } else if (activeElement === last || isLoseFocus) {
        first.focus()
        event.preventDefault()
      }
    } else if (event.key === 'Escape') {
      destroy()
    }
  }

  function destroy() {
    if (active) {
      const index = focusTrapStack.indexOf(trapId)
      if (index !== -1) {
        focusTrapStack.splice(index, 1)
      }

      active = false
      first = undefined
      last = undefined
      query = undefined
      root = undefined
      document.removeEventListener('keydown', onKey)
    }
  }

  if (!active) {
    document.addEventListener('keydown', onKey)
    active = true
  }

  init()

  return {
    destroy,
    container: root,
  }
}
