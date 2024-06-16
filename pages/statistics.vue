<script setup lang="ts">
import { NDataTable } from "naive-ui";
const { devices } = useDevices();
const { alerts } = useAlerts();

const alertNumPerDevice = computed(() =>
  alerts.value.reduce(
    (acc, alert) => {
      const existingDevice = acc.find((item) => item.device === alert.device);
      if (existingDevice) {
        existingDevice.num++;
      } else {
        acc.push({ num: 1, device: alert.device });
      }
      return acc;
    },
    [] as { num: number; device: string }[]
  )
);

const emptyDevices = computed(() => {
  const empty = devices.value.filter((device) => {
    return !alertNumPerDevice.value.some((num) => num.device === device.id);
  });
  return empty.map((device) => {
    return {
      name: device.name,
      alerts: 0,
    };
  });
});

const tableData = computed(() =>
  alerts.value.map((alert) => {
    return {
      name: alert.expand?.device.name,
      alerts: alertNumPerDevice.value.filter(
        (num) => num.device === alert.device
      )[0].num,
    };
  })
);

const uniqueTableData = computed(() => {
  const uniqueRecords = [];
  const deviceNames = new Set();
  for (const record of tableData.value) {
    if (!deviceNames.has(record.name)) {
      uniqueRecords.push(record);
      deviceNames.add(record.name);
    }
  }

  return uniqueRecords;
});

const columns = [
  {
    title: "Device Name",
    key: "name",
  },
  {
    title: "Number of Alerts",
    key: "alerts",
    render(row: any) {
      return h(
        "span",
        {
          class: row.alerts === 0 ? "text-green-500" : "",
        },
        {
          default: () => row.alerts,
        }
      );
    },
  },
];
</script>

<template>
  <nuxt-layout name="dashboard">
    <div>
      <div class="flex flex-col w-full gap-8 capitalize">
        <n-data-table
          :columns="columns"
          :data="[...uniqueTableData, ...emptyDevices]"
          :bordered="false"
          :max-height="500"
          virtual-scroll
        />
      </div>
    </div>
  </nuxt-layout>
</template>
