/**
 * List of focusable elements within the trap
 */
let focusableElements
/**
 * First element in the focus sequence
 */
let firstFocusableElement
/**
 * Last element in the focus sequence
 */
let lastFocusableElement
/**
 * CSS selector for focusable elements
 */
let focusableElementsSelector

let focusableElementsContainer

/**
 * Resets list of focusable elements and manages trap destruction
 * @returns {void}
 */
const resetFocusableElements = () => {
  focusableElements = Array.from(
    (focusableElementsContainer || document).querySelectorAll(
      focusableElementsSelector
    )
  ).filter((element) => {
    return (
      // (element.offsetWidth > 0 || element.offsetHeight > 0) &&
      element.disabled !== true
    )
  })
  firstFocusableElement = focusableElements[0]
  lastFocusableElement = focusableElements.at(-1)

  if (!firstFocusableElement || !lastFocusableElement) {
    destroyFocusTrap()
  }
}

/**
 * Initializes focusable elements and creates temporary anchor element
 * Creates invisible button to capture initial focus and handle boundary cases
 * @returns {void}
 */
const initFocusableElements = () => {
  resetFocusableElements()

  if (firstFocusableElement) {
    const temporaryFirstFocusableElement = document.createElement('button')
    temporaryFirstFocusableElement.setAttribute(
      'style',
      'position: absolute; top: -10000px;height: 10px; width: 10px;'
    )

    firstFocusableElement.before(temporaryFirstFocusableElement)

    temporaryFirstFocusableElement.addEventListener('blur', () => {
      temporaryFirstFocusableElement.remove()
      resetFocusableElements()
    })

    firstFocusableElement = temporaryFirstFocusableElement

    temporaryFirstFocusableElement.focus()
  }
}

/**
 * Handles keyboard navigation constraints
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {void}
 */
const handleKeyDown = (event) => {
  resetFocusableElements()
  if (!document.body.contains(firstFocusableElement)) {
    destroyFocusTrap()
    return
  }

  if (event.key === 'Tab') {
    if (!firstFocusableElement || !lastFocusableElement) {
      destroyFocusTrap()
      return
    }

    const activeElement = document.activeElement

    // When user clicks on address bar or developer tools, document.activeElement becomes null, requiring re-initialization
    // If the previously active element was removed from DOM, activeElement defaults to document.body - use default behavior
    if (
      !focusableElements.includes(activeElement) &&
      activeElement !== document.body
    ) {
      initFocusableElements()
    }

    if (event.shiftKey) {
      if (activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        event.preventDefault()
      }
    } else if (activeElement === lastFocusableElement) {
      firstFocusableElement.focus()
      event.preventDefault()
    }
  }
}

/**
 * Destroys focus trap by removing event listeners
 * @returns {void}
 */
function destroyFocusTrap() {
  document.removeEventListener('keydown', handleKeyDown)
}

/**
 * Initializes focus trap with custom container and selector
 * @param {Object} [container] - Container element to scope the focus trap
 * @param {string} [selector] - CSS selector for focusable elements (optional)
 * @returns {void}
 *
 * @description When called with single parameter:
 * - Default selector: 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
 */
export function initFocusTrap(container, selector) {
  focusableElementsContainer = container
  focusableElementsSelector =
    selector ||
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  document.addEventListener('keydown', handleKeyDown)
  initFocusableElements()
}
