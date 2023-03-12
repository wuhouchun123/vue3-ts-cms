import { createApp } from 'vue'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import { registerApp } from './global'

import { whcRequest } from './service'
import 'normalize.css'
import './assets/css/index.less'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

whcRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log('请求的data是：', res.data)
    console.log('请求的returnCode是：', res.returnCode)
    console.log('请求的success是：', res.success)
  })
  .catch((err) => {
    console.log('请求错误：', err)
  })

//这个有可能不需要导入，到时候测试下
import 'element-plus/theme-chalk/base.css'

import router from './router'
import store from './store'

// import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).mount('#app')
