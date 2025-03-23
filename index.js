/**
 * Lightweight focus trapping utility for implementing WAI-ARIA compliant keyboard navigation constraints in modal dialogs, sidebars, and other contained UI components
 */

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
let _focusableElementsSelector

/**
 * Resets list of focusable elements and manages trap destruction
 * @returns {void}
 */
const resetFocusableElements = () => {
  focusableElements = Array.from(
    document.querySelectorAll(_focusableElementsSelector)
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
 * Initializes focus trap with custom selector
 * @param {string} [focusableElementsSelector] - Optional CSS selector for focusable elements
 * @returns {void}
 */
export function initFocusTrap(focusableElementsSelector) {
  _focusableElementsSelector =
    focusableElementsSelector ||
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  document.addEventListener('keydown', handleKeyDown)
  initFocusableElements()
}
