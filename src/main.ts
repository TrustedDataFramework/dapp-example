import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import '@/css/custom.scss'

import '@/contracts/welfare.wasm'
import '@/contracts/welfare.abi.json'
import '@/contracts/welfare.wasm.map'
// import src from '@/vendor/tds-sdk.min.js'
// import '@/vendor/tds-sdk.min.js.map'

// const script = document.createElement('script')
// script.src = src
// document.body.appendChild(script)

// script.onload = () => {
    const root = document.getElementById('app')
    const app = createApp(App)
    
    app.use(router)
    app.mount(root)
// }

