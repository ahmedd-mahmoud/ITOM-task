export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  // redirect the user to the login page
  if (!user && to.path !== "/auth") {
    return navigateTo({
      path: "/auth",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
