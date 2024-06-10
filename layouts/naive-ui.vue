<script lang="ts" setup>
import { NConfigProvider, NMessageProvider, darkTheme } from "naive-ui";
</script>

<template>
  <n-config-provider
    :theme="darkTheme"
    class="flex min-h-screen w-full relative text-white"
  >
    <n-message-provider>
      <slot></slot>
    </n-message-provider>
  </n-config-provider>
</template>
