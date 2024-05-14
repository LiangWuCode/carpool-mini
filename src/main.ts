import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import pinia from "@/store/store";
import tmui from "./tmui";
import App from "./App.vue";
import {config} from "@/theme/config"

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  app.use(tmui, {...config} as Tmui.tmuiConfig);
  return {
    app,
    Pinia,
  };
}
