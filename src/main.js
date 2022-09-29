import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import Store from "./store";
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/display.css';


const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(Store);
app.mount('#app');