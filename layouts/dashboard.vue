<script setup lang="ts">
import { useAppInit } from "~/composables/states/useAppInit";
import { NLayout, NLayoutSider } from "naive-ui";

const collapsed = ref(false);

const initApp = useAppInit();

await initApp();
</script>

<template>
  <nuxt-layout name="naive-ui">
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="bg-[#0a3232]"
      >
        <layout-side-menu :collapsed="collapsed" />
      </n-layout-sider>

      <n-layout>
        <div class="flex flex-col gap-2 w-full">
          <layout-navbar />
          <main class="flex flex-grow">
            <slot />
          </main>
        </div>
      </n-layout>
    </n-layout>
  </nuxt-layout>
</template>
