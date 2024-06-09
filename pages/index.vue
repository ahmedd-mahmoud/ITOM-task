<script setup lang="ts">
import { NButton } from "naive-ui";
import useUser from "~/composables/useUser";

// const { logout } = useAuth();
const { logout } = useUser();

const handleLogout = async () => {
  logout();
};
</script>

<template>
  <div>
    <n-button type="primary" @click="handleLogout">Logout</n-button>
  </div>
</template>
