import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

// create App
const app = createApp(App);

// configure App
app.config.errorHandler = function (err) {
  console.error(" aaaaaa ", err);
};

// app.component("testComponent", testComponent);

// mount
app.mount("#yxing-app");
