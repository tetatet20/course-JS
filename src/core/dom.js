class Dom {
  constructor(selector) {
// app
  this.$el = typeof selector === 'string'
  ? document.querySelector(selector)
  :selector
  }
  html( html ) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  of(eventType, callback) {
  this.$el.removeventListener(eventType, callback)
  }

  // Element
  append(node) {
    // if (node instanceof Dom) {
    //   node = node.$el
    // }
    if (Element.prototype.append) {
      this.$el.append(node.$el)
    } else {
      this.$el.appendChild(node.$el)
    }
    return this
  }

get data() {
  return this.$el.dataset
}

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
  Object.keys(styles).forEach((key) => {
    this.$el.style[key] = styles[key]
  })
  }
}

// event.target
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
