/* Pocketbase Middleware */

export default defineNuxtRouteMiddleware((to) => {
  const client = usePocketbase();
  const isLoggedIn = computed(() => client.authStore?.isValid);

  if (isLoggedIn.value && to.path === "/auth") {
    return navigateTo("/");
  }
  if (!isLoggedIn.value && to.path === "/") {
    return navigateTo("/auth");
  }
});

/* Firebase Middleware */

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const user = await getCurrentUser();

//   // redirect the user to the login page
//   if (!user && to.path !== "/auth") {
//     return navigateTo({
//       path: "/auth",
//       query: {
//         redirect: to.fullPath,
//       },
//     });
//   }
// });
