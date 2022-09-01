import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('NO $root')
    }
    this.$root = $root;
    this.listeners = listeners
  }
  initDomListeners() {
  // console.log(this.listeners)
this.listeners.forEach( (listener) => {
  const method = getMethodName(listener)
  if (!this[method]) {
    throw new Error(`
    method ${method} is not implemeted in ${this.name || ''} Component`)
  }
  this[method] = this[method].bind(this)
  // тоже самое что и addEventListener
  this.$root.on(listener, this [method])
});
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
