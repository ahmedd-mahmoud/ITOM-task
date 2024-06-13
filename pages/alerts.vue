<script setup lang="ts">
import useAlerts from "~/composables/api/useAlerts";
import { NTag, NDataTable, NFlex, NDropdown, NIcon } from "naive-ui";
import { AlertSeverityOptions, AlertStatusOptions } from "~/types/enums";
import { formatDistanceStrict } from "date-fns";
import { Edit16Regular } from "@vicons/fluent";

const { alerts, updateAlert } = useAlerts();

const tableData = computed(() =>
  alerts.value.map((alert) => {
    return {
      id: alert.id,
      device: alert.expand?.device.name,
      details: alert.details,
      created: formatDistanceStrict(new Date(alert.created), new Date(), {
        addSuffix: true,
      }),
      severity: alert.severity,
      status: alert.status,
    };
  })
);

const statusOptions = [
  {
    label: AlertStatusOptions.PENDING,
    key: "pending",
  },
  {
    label: "In Process",
    key: "inProcess",
  },
  {
    label: AlertStatusOptions.RESOLVED,
    key: "resolved",
  },
];

const handleStatusSelect = async (key: string, row: any) => {
  const alert = alerts.value.find((item) => item.id === row.id)!;
  switch (key) {
    case "pending":
      const res1 = await updateAlert(alert.id, {
        ...alert,
        status: AlertStatusOptions.PENDING,
      });
      alerts.value = alerts.value.map((alert) => {
        if (alert.id === res1?.id) {
          return res1;
        }
        return alert;
      });
      break;
    case "inProcess":
      const res2 = await updateAlert(alert.id, {
        ...alert,
        status: AlertStatusOptions.IN_PROCESS,
      });
      alerts.value = alerts.value.map((alert) => {
        if (alert.id === res2?.id) {
          return res2;
        }
        return alert;
      });
      break;
    case "resolved":
      const res3 = await updateAlert(alert.id, {
        ...alert,
        status: AlertStatusOptions.RESOLVED,
      });
      alerts.value = alerts.value.map((alert) => {
        if (alert.id === res3?.id) {
          return res3;
        }
        return alert;
      });
      break;
    default:
      break;
  }
};

const severityOptions = [
  {
    label: AlertSeverityOptions.INFO,
    key: AlertSeverityOptions.INFO,
  },
  {
    label: AlertSeverityOptions.WARNING,
    key: AlertSeverityOptions.WARNING,
  },
  {
    label: AlertSeverityOptions.CRITICAL,
    key: AlertSeverityOptions.CRITICAL,
  },
];

const handleSeveritySelect = async (key: string, row: any) => {
  const alert = alerts.value.find((item) => item.id === row.id)!;
  switch (key) {
    case AlertSeverityOptions.INFO:
      const res1 = await updateAlert(alert.id, {
        ...alert,
        severity: AlertSeverityOptions.INFO,
      });
      alerts.value = alerts.value.map((alert) => {
        if (alert.id === res1?.id) {
          return res1;
        }
        return alert;
      });
      break;
    case AlertSeverityOptions.WARNING:
      const res2 = await updateAlert(alert.id, {
        ...alert,
        severity: AlertSeverityOptions.WARNING,
      });
      alerts.value = alerts.value.map((alert) => {
        if (alert.id === res2?.id) {
          return res2;
        }
        return alert;
      });
      break;
    case AlertSeverityOptions.CRITICAL:
      const res3 = await updateAlert(alert.id, {
        ...alert,
        severity: AlertSeverityOptions.CRITICAL,
      });
      alerts.value = alerts.value.map((alert) => {
        if (alert.id === res3?.id) {
          return res3;
        }
        return alert;
      });
      break;
    default:
      break;
  }
};

const columns = [
  {
    title: "Details",
    key: "details",
    render(row: any) {
      return h(NFlex, { vertical: true, class: "gap-2" }, [
        h("span", {}, row.device),
        h("span", {}, row.details),
      ]);
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
        NDropdown,
        {
          trigger: "click",
          options: severityOptions,
          class: "capitalize",
          onSelect: (key: string) => handleSeveritySelect(key, row),
        },
        [
          h(
            NTag,
            {
              bordered: false,
              type:
                row.severity === AlertSeverityOptions.CRITICAL
                  ? "error"
                  : row.severity === AlertSeverityOptions.WARNING
                    ? "warning"
                    : "info",
              class: "hover:cursor-pointer",
            },
            {
              default: () => row.severity,
              icon: () => h(NIcon, { component: Edit16Regular }),
            }
          ),
        ]
      );
    },
  },
  {
    title: "Status",
    key: "status",
    render(row: any) {
      return h(
        NDropdown,
        {
          trigger: "click",
          options: statusOptions,
          class: "capitalize",
          onSelect: (key: string) => handleStatusSelect(key, row),
        },
        [
          h(
            NTag,
            {
              bordered: false,
              type:
                row.status === AlertStatusOptions.PENDING
                  ? "warning"
                  : row.status === AlertStatusOptions.IN_PROCESS
                    ? "info"
                    : "success",
              class: "hover:cursor-pointer",
            },
            {
              default: () =>
                row.status === AlertStatusOptions.IN_PROCESS
                  ? "In Process"
                  : row.status,
              icon: () => h(NIcon, { component: Edit16Regular }),
            }
          ),
        ]
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
