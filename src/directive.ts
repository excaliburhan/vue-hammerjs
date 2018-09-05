import Hammer from 'hammerjs'
import { capitalize } from './utils'

const defaultRecognizers: any[] = ['pan', 'pinch', 'press', 'rotate', 'swipe', 'tap']
const eventOptions = {
  doubletap: { type: 'tap', options: { event: 'doubletap', taps: 2 } },
  tripletap: { type: 'tap', options: { event: 'tripletap', taps: 3 } },
}
let recognizers
let mc
let callback

function findRecognizer (arg, rs) {
  // for custom events, like doubletap
  let customEvent = eventOptions[arg]
  if (customEvent) {
    let opts = {}
    try {
      opts = rs[customEvent.type].options || {}
    } catch (e) {}
    return {
      type: customEvent.type,
      options: { ...opts, ...customEvent.options }
    }
  } else {
    // for hammer events, like swipeleft -> swipe
    let r = rs.filter(r => arg.indexOf(r.type) === 0)[0]
    return r || null
  }
}

export default {
  init (config) {
    recognizers = config || defaultRecognizers
    recognizers = recognizers.map(r => {
      if (typeof r === 'string') {
        r = { type: r }
      }
      return r
    })
  },
  bind (el, binding) {
    let { arg, value } = binding
    if (typeof value !== 'function') {
      console.error('[Vue-Hammerjs]: Invalid binding.value for v-hm, it must be a function.')
      return
    }
    mc = new Hammer.Manager(el)
    // find recognizer options
    let recognizer = findRecognizer(arg, recognizers)
    if (!recognizer) {
      return
    }
    // hammer instance
    let { type, options } = recognizer
    let hmIns = new Hammer[capitalize(type)](options)
    mc.add(hmIns)
    // on/off event
    if (callback) {
      mc.off(arg, e => {
        callback(arg, e)
      })
    }
    callback = value
    mc.on(arg, e => {
      callback(arg, e)
    })
  },
  unbind () {
    if (mc) {
      mc.destroy()
      mc = null
    }
  }
}
