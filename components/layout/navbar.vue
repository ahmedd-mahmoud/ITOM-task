<script setup lang="ts">
import { NInput, NIcon, NDropdown } from "naive-ui";
import { Search, LogOutOutline, Notifications } from "@vicons/ionicons5";
import { UserAvatarFilled, UserAvatar } from "@vicons/carbon";
import useUser from "~/composables/useUser";

const { logout, user } = useUser();

const options = [
  {
    label: user.value?.name,
    key: "name",
    disabled: true,
    icon: renderIcon(UserAvatar),
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogOutOutline),
  },
];

const handleSelect = (key: string) => {
  switch (key) {
    case "logout":
      logout();
      break;
    default:
      break;
  }
};
</script>

<template>
  <div
    class="flex justify-end sm:justify-between w-full py-4 px-5 border-b border-neutral-500 border-opacity-40"
  >
    <div class="w-64 lg:w-80 hidden sm:flex">
      <n-input round placeholder="Search">
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-input>
    </div>
    <div class="flex gap-2 items-center">
      <div
        class="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-500"
      >
        <n-icon
          :component="Notifications"
          :size="20"
          class="hover:cursor-pointer hover:opacity-70"
        />
      </div>

      <n-dropdown :options="options" trigger="click" @select="handleSelect">
        <n-icon
          :component="UserAvatarFilled"
          :size="36"
          class="hover:cursor-pointer hover:opacity-70"
        />
      </n-dropdown>
    </div>
  </div>
</template>
