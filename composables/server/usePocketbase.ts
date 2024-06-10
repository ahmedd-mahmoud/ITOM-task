import PocketBase from "pocketbase";

export default function () {
  const runtimeConfig = useRuntimeConfig();
  return new PocketBase("http://127.0.0.1:8090");
}
