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
