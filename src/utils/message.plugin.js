import localizeFilter from "@/filters/localize.filter";

export default {
  install(Vue, option) {
    Vue.prototype.$message = function (text) {
      M.toast({html: text})
    }

    Vue.prototype.$error = function (text) {
      M.toast({html: `[${localizeFilter('Error')}]: ${text}`})
    }
  }
}
