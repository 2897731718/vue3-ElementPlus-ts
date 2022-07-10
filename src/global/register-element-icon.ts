import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import { Location, Edit, Delete } from '@element-plus/icons-vue'

const compIcons = {
  Location,
  Edit,
  Delete,
}

export default function (app: App): void {
  for (const [key, icon] of Object.entries(compIcons)) {
    app.component(key, icon)
  }
}
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import { App } from 'vue'

// export default function (app: App): void {
//   for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }
// }
