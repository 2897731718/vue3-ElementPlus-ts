import { App } from 'vue'
// import registerElement from './register-element'
import registerElementIcons from './register-element-icon'

export function globalRegister(app: App): void {
  // app.use(registerElement)
  app.use(registerElementIcons)
}
