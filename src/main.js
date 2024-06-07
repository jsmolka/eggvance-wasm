import App from '@/App.vue';
import '@/main.scss';
import { router } from '@/router';
import { createApp } from 'vue';

function main() {
  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

main();
