import directiveConfig from './directive'

const VueHammerjs = {
  install (Vue, options) {
    directiveConfig.init(options)
    Vue.directive('hm', directiveConfig)
  }
}

export default VueHammerjs
