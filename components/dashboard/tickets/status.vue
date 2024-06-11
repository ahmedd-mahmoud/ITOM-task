<script setup lang="ts">
import { TicketStatusOptions } from "~/types/enums";

const { tickets } = useTickets();

const statusCount = {
  [TicketStatusOptions.OPEN]: { count: 0, color: "bg-blue-500" },
  [TicketStatusOptions.PENDING]: { count: 0, color: "bg-yellow-300" },
  [TicketStatusOptions.OVERDUE]: { count: 0, color: "bg-red-600" },
};

tickets.value.forEach((item) => {
  if (statusCount[item.status] !== undefined) {
    statusCount[item.status].count++;
  }
});
</script>

<template>
  <div class="flex items-center gap-12">
    <div
      v-for="[status, item] in Object.entries(statusCount)"
      class="flex items-center text-xl gap-2 capitalize w-40"
    >
      <div
        class="p-4 flex justify-center items-center border bg-opacity-85 rounded-xl"
        :class="item.color"
      >
        <span>{{ item.count }}</span>
      </div>
      <span>{{ status + " tickets" }}</span>
    </div>
  </div>
</template>
