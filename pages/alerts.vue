<script setup lang="ts">
import useAlerts from "~/composables/api/useAlerts";
import { NTag, NDataTable, NBadge, NButton, NFlex, NModal } from "naive-ui";
import { AlertSeverityOptions } from "~/types/enums";
import { formatDistanceStrict } from "date-fns";

const { alerts, updateAlert } = useAlerts();

const tableData = computed(() =>
  alerts.value.map((alert) => {
    return {
      id: alert.id,
      device: alert.expand?.device.name,
      details: alert,
      created: formatDistanceStrict(new Date(alert.created), new Date(), {
        addSuffix: true,
      }),
      severity: alert.severity,
      status: alert.status,
    };
  })
);

const columns = [
  {
    title: "Details",
    key: "details",
    render(row: any) {
      return h(
        NFlex,
        {
          alignItems: "center",
        },
        {
          default: () =>
            h(NFlex, { class: "items-center" }, [
              h(NBadge, {
                color:
                  row.availability === "online"
                    ? "green"
                    : row.availability === "offline"
                      ? "red"
                      : "gray",
                dot: true,
              }),
              h("span", {}, row.availability),
            ]),
        }
      );
    },
  },
  {
    title: "Created",
    key: "created",
  },
  {
    title: "Severity",
    key: "severity",
    render(row: any) {
      return h(
        NTag,
        {
          bordered: false,
          type: "error",
        },
        {
          default: () => row.critical,
        }
      );
    },
  },
  {
    title: "Status",
    key: "status",
    render(row: any) {
      return h(
        NTag,
        {
          bordered: false,
          type: "warning",
        },
        {
          default: () => row.warning,
        }
      );
    },
  },
];
</script>

<template>
  <nuxt-layout name="dashboard">
    <div class="flex flex-col w-full gap-8 capitalize">
      <div class="flex w-full items-center pt-4">
        <h1 class="text-3xl">Alerts</h1>
      </div>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :max-height="500"
        virtual-scroll
      />
    </div>
  </nuxt-layout>
</template>
