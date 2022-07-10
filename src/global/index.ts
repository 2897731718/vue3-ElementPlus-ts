import { App } from 'vue'
// import registerElement from './register-element'
import registerElementIcons from './register-element-icon'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  // app.use(registerElement)
  app.use(registerElementIcons)
  app.use(registerProperties)
}
