<script setup lang="ts">
import { NButton } from "naive-ui";

const { logout } = useAuth();

const handleLogout = async () => {
  logout();
};
</script>

<template>
  <div>
    <n-button type="primary" @click="handleLogout">Logout</n-button>
  </div>
</template>
