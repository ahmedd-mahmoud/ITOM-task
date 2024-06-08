import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useMessage } from "naive-ui";

export default function () {
  const auth = getAuth();
  const router = useRouter();
  const message = useMessage();

  const user = computed(async () => await getCurrentUser());
  const isLoggedIn = computed(() => auth.currentUser !== null);

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push({ path: "/" });
        message.success("Signed in successfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        router.push({ path: "/auth" });
        message.success("Signed out successfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
}
