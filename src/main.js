import { createApp } from 'vue';
import App from './App.vue';
import './main.scss';
import { router } from './router';

function main() {
  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

main();
