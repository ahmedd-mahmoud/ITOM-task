<script setup lang="ts">
import { AlertSeverityOptions } from "~/types/enums";

const { alerts } = useAlerts();

const severityCount = {
  [AlertSeverityOptions.INFO]: { count: 0, color: "bg-blue-500" },
  [AlertSeverityOptions.WARNING]: { count: 0, color: "bg-yellow-300" },
  [AlertSeverityOptions.CRITICAL]: { count: 0, color: "bg-red-600" },
};

alerts.value.forEach((item) => {
  if (severityCount[item.severity] !== undefined) {
    severityCount[item.severity].count++;
  }
});
</script>

<template>
  <div class="flex items-center gap-12">
    <div
      v-for="[severity, item] in Object.entries(severityCount)"
      class="flex items-center text-xl gap-2 capitalize w-40"
    >
      <div
        class="p-4 flex justify-center items-center border bg-opacity-85 rounded-xl"
        :class="item.color"
      >
        <span>{{ item.count }}</span>
      </div>
      <span>{{ severity + " alerts" }}</span>
    </div>
  </div>
</template>
