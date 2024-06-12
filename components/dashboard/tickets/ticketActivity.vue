<script setup lang="ts">
import type { ChartOptions } from "chart.js";
import { BarChart, useBarChart } from "vue-chart-3";
import { TicketStatusOptions, type AnalyticsType } from "~/types/enums";

const { tickets } = useTickets();

const labels = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
});

const getDevicesCreatedLast7Days = (status: TicketStatusOptions) => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const counts = Array(7).fill(0);

  tickets.value.forEach((ticket) => {
    if (ticket.status === status) {
      const ticketDate = new Date(ticket.updated);
      const startOfDeviceDate = new Date(
        ticketDate.getFullYear(),
        ticketDate.getMonth(),
        ticketDate.getDate()
      );

      const diffTime = startOfToday.getTime() - startOfDeviceDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24); // Difference in days

      if (diffDays >= 0 && diffDays < 7) {
        counts[6 - diffDays]++;
      }
    }
  });

  return counts;
};

const openedTickets = computed(() =>
  getDevicesCreatedLast7Days(TicketStatusOptions.OPEN)
);
const resolvedTickets = computed(() =>
  getDevicesCreatedLast7Days(TicketStatusOptions.PENDING)
);

const chartData = ref({
  labels: labels.reverse(),
  datasets: [
    {
      label: "Opened",
      data: openedTickets.value,
      backgroundColor: "#154d4c",
      borderColor: "#154d4c",
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      barThickness: 30,
    },
    {
      label: "Resolved",
      data: resolvedTickets.value,
      backgroundColor: "#d1ae78",
      borderColor: "#d1ae78",
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
      text: "Ticket Activity",
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
    <span class="flex justify-center p-4 text-xl">Ticket Activity</span>
    <BarChart v-bind="barChartProps" />
  </div>
</template>
