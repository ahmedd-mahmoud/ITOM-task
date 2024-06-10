import { useMessage } from "naive-ui";
import usePocketbase from "~/composables/server/usePocketbase";

export default function () {
  const client = usePocketbase();
  const message = useMessage();
  const router = useRouter();

  const user = computed(() => client.authStore?.model);
  const isLoggedIn = computed(() => client.authStore?.isValid);

  const login = async (email: string, pass: string) => {
    try {
      const authData = await client
        .collection("users")
        .authWithPassword(email, pass);

      if (!authData.token) {
        message.error("Failed to login");
      } else {
        router.push("/");
        message.success("Login successful");
      }
    } catch (error: any) {
      if (error.status === 400) {
        message.error("You have entered an invalid username or password");
      } else {
        message.error("Failed to authenticate");
      }
    }
  };

  const logout = () => {
    client.authStore.clear?.();
    router.push("/auth");
    message.success("Logged out successfully");
  };
  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
}
