<script setup lang="ts">
import { NMenu } from "naive-ui";
import { DashboardOutlined, WarningOutlined } from "@vicons/antd";
import { DeviceDesktop } from "@vicons/tabler";
import { ClipboardTaskListRtl20Regular as TicketIcon } from "@vicons/fluent";
import { RouterLink } from "vue-router";

defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const menuOptions = [
  {
    label: () => h(RouterLink, { to: "/" }, { default: () => "Dashboard" }),
    key: "dashboard",
    icon: renderIcon(DashboardOutlined),
  },
  {
    label: () =>
      h(RouterLink, { to: "/devices" }, { default: () => "Devices" }),
    key: "devices",
    icon: renderIcon(DeviceDesktop),
  },
  {
    label: () => h(RouterLink, { to: "/alerts" }, { default: () => "Alerts" }),
    key: "alerts",
    icon: renderIcon(WarningOutlined),
  },
  {
    label: () =>
      h(RouterLink, { to: "/tickets" }, { default: () => "Tickets" }),
    key: "tickets",
    icon: renderIcon(TicketIcon),
  },
  {
    label: () =>
      h(RouterLink, { to: "/statistics" }, { default: () => "Statistics" }),
    key: "statistics",
    icon: renderIcon(TicketIcon),
  },
];
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <h1 class="text-3xl self-center" :class="collapsed ? 'invisible' : ''">
      LOGO
    </h1>
    <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
    />
  </div>
</template>
