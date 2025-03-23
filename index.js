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

let parentElement

/**
 * Resets list of focusable elements and manages trap destruction
 * @returns {void}
 */
const resetFocusableElements = () => {
  focusableElements = Array.from(
    (parentElement || document).querySelectorAll(focusableElementsSelector)
  )
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
      'position: absolute; top: -100px;'
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
  if (!document.body.contains(firstFocusableElement)) {
    destroyFocusTrap()
    return
  }

  if (event.key === 'Tab') {
    if (!firstFocusableElement || !lastFocusableElement) {
      destroyFocusTrap()
      return
    }

    // After click adress bar or developer tool, the document.activeElement will be empty, so we need to init it again
    if (!focusableElements.includes(document.activeElement)) {
      initFocusableElements()
    }

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        event.preventDefault()
      }
    } else if (document.activeElement === lastFocusableElement) {
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
 * Initializes focus trap with custom selector and container
 * @param {string} [selector] - CSS selector for focusable elements (optional)
 * @param {Object} [container] - Container element to scope the focus trap
 * @returns {void}
 *
 * @description When called with single parameter:
 * - If parameter is object type, treats it as container
 * - Default selector: 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
 */
export function initFocusTrap(selector, container) {
  if (!container && typeof selector === 'object') {
    container = selector
    selector = undefined
  }

  parentElement = container
  focusableElementsSelector =
    selector ||
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  document.addEventListener('keydown', handleKeyDown)
  initFocusableElements()
}
