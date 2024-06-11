<script setup lang="ts">
import { NTag, NTime, NIcon } from "naive-ui";
import { DeviceDesktop } from "@vicons/tabler";
import { AlertSeverityOptions } from "~/types/enums";

const { alerts } = useAlerts();
</script>

<template>
  <div class="flex flex-col gap-4 h-64 bg-neutral-800">
    <h2 class="text-xl">Recent Alerts</h2>
    <div class="flex flex-col gap-8 overflow-auto scrollbar-hidden">
      <div v-for="alert in alerts" class="capitalize flex flex-col gap-1">
        <div class="flex items-center gap-2 font-semibold">
          <n-tag
            :bordered="false"
            :type="
              alert.severity === AlertSeverityOptions.CRITICAL
                ? 'error'
                : alert.severity === AlertSeverityOptions.WARNING
                  ? 'warning'
                  : 'info'
            "
          >
            {{ alert.severity }}
          </n-tag>
          <n-time
            :time="new Date(alert.created).getTime()"
            :to="new Date().getTime()"
            type="relative"
          />
        </div>
        <div class="flex items-center gap-1">
          <n-icon :component="DeviceDesktop" />
          <span>{{ alert.expand?.device.name }}</span>
        </div>
        <p class="font-bold">{{ alert.details }}</p>
      </div>
    </div>
  </div>
</template>
