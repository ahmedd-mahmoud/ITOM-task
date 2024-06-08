// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxtjs-naive-ui", "nuxt-vuefire"],
  ssr: false,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  typescript: {
    shim: false,
  },
  imports: {
    dirs: [
      "composables",
      "composables/*/index.{ts,js,mjs,mts}",
      "composables/**",
    ],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: "AIzaSyD9fEYHYqioldLk1rFaoaiZR59oynavc2k",
      authDomain: "ms-task-26752.firebaseapp.com",
      projectId: "ms-task-26752",
      storageBucket: "ms-task-26752.appspot.com",
      messagingSenderId: "534829434319",
      appId: "1:534829434319:web:72a480c61d890948ea7eba",
    },
  },
});
