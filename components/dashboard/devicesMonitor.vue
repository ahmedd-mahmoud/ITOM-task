<script setup lang="ts">
import type { ChartOptions } from "chart.js";
import { BarChart, useBarChart } from "vue-chart-3";
import { DeviceAvailabilityOptions, type AnalyticsType } from "~/types/enums";

const { devices } = useDevices();

const typeIndexMap = {
  pc: 0,
  server: 1,
  mac: 2,
  linux: 3,
};

const onlineDevices = computed(() => {
  const counts = [0, 0, 0, 0];
  devices.value.forEach((device) => {
    if (device.availability === DeviceAvailabilityOptions.ONLINE) {
      counts[typeIndexMap[device.type]]++;
    }
  });
  return counts;
});

const offlineDevices = computed(() => {
  const counts = [0, 0, 0, 0];
  devices.value.forEach((device) => {
    if (device.availability === DeviceAvailabilityOptions.OFFLINE) {
      counts[typeIndexMap[device.type]]++;
    }
  });
  return counts;
});

const chartData = ref({
  labels: ["PC", "Server", "Mac", "Linux"],
  datasets: [
    {
      label: "Online",
      data: onlineDevices.value,
      backgroundColor: "#006600",
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      barThickness: 30,
    },
    {
      label: "Offline",
      data: offlineDevices.value,
      backgroundColor: "#ff0000",
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      barThickness: 30,
    },
  ],
});

const options = computed<ChartOptions<AnalyticsType.BarChart>>(() => ({
  plugins: {
    title: {
      display: false,
      text: "Devices Monitor",
    },
    legend: {
      display: true,
      position: "top",
    },
  },
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: "#f3f4f6",
      },
    },
    y: {
      ticks: {
        color: "#f3f4f6",
      },
    },
  },
}));
const { barChartProps } = useBarChart({
  chartData,
  options,
});
</script>

<template>
  <div class="flex flex-col justify-between p-4">
    <span class="flex justify-center p-4 text-xl"> Devices Monitor </span>
    <BarChart v-bind="barChartProps" />
  </div>
</template>
