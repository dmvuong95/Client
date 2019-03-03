import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import elementViLocale from 'element-ui/lib/locale/lang/vi' // element-ui lang
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
// import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
// import enLocale from './en'
// import zhLocale from './zh'
// import esLocale from './es'

Vue.use(VueI18n)

const messages = {
  // vi: {
  //   ...elementViLocale
  // }
  en: {
    // ...enLocale,
    ...elementEnLocale
  }
  // zh: {
  //   ...zhLocale,
  //   ...elementZhLocale
  // },
  // es: {
  //   ...esLocale,
  //   ...elementEsLocale
  // }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: window.$cookies.get('language') || 'en',
  // set locale messages
  messages
})

export default i18n
