<script setup lang="ts">
import useDevices from "~/composables/api/useDevices";
import { NTag, NDataTable, NBadge, NButton, NFlex, NModal } from "naive-ui";
import { AlertSeverityOptions } from "~/types/enums";

const { devices, deleteDevice } = useDevices();
const { alerts } = useAlerts();

const editModal = ref(false);
const addModal = ref(false);
const deleteModal = ref(false);
const deviceIdToEdit = ref("");
const deviceIdToDelete = ref("");

const handleEdit = (device: any) => {
  deviceIdToEdit.value = device.id;
  editModal.value = true;
};

const handleOpenDeleteModal = (device: any) => {
  deviceIdToDelete.value = device.id;
  deleteModal.value = true;
};

const handleDelete = async () => {
  devices.value = devices.value.filter(
    (device) => device.id !== deviceIdToDelete.value
  );
  await deleteDevice(deviceIdToDelete.value);
  deleteModal.value = false;
};

const tableData = computed(() =>
  devices.value.map((device) => {
    return {
      id: device.id,
      name: `${device.name} (${device.type})`,
      availability: device.availability,
      critical: alerts.value.filter(
        (alert) =>
          alert.severity === AlertSeverityOptions.CRITICAL &&
          alert.device === device.id
      ).length,
      warning: alerts.value.filter(
        (alert) =>
          alert.severity === AlertSeverityOptions.WARNING &&
          alert.device === device.id
      ).length,
      info: alerts.value.filter(
        (alert) =>
          alert.severity === AlertSeverityOptions.INFO &&
          alert.device === device.id
      ).length,
      actions: ["Edit", "Delete"],
    };
  })
);

const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Availability",
    key: "availability",
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
    title: "Critical",
    key: "critical",
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
    title: "Warning",
    key: "warning",
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
  {
    title: "Info",
    key: "info",
    render(row: any) {
      return h(
        NTag,
        {
          bordered: false,
          type: "info",
        },
        {
          default: () => row.info,
        }
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render(row: any) {
      const actions = row.actions.map((action: string) => {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            class: "m-2",
            onClick: () =>
              action == "Edit" ? handleEdit(row) : handleOpenDeleteModal(row),
          },
          { default: () => action }
        );
      });
      return actions;
    },
  },
];
</script>

<template>
  <nuxt-layout name="dashboard">
    <div class="flex flex-col w-full gap-8 capitalize">
      <div class="flex w-full items-center pt-4 justify-between">
        <h1 class="text-3xl">Devices</h1>
        <n-button type="primary" size="medium" @click="addModal = true">
          Add Device
        </n-button>
      </div>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :max-height="500"
        virtual-scroll
      />
    </div>
    <n-modal v-model:show="editModal">
      <devices-form
        device-form-modal-type="edit"
        :device-id-to-edit="deviceIdToEdit"
        @close="editModal = false"
      />
    </n-modal>
    <n-modal v-model:show="addModal">
      <devices-form device-form-modal-type="add" @close="addModal = false" />
    </n-modal>
    <n-modal v-model:show="deleteModal">
      <div class="p-20 bg-black">
        <p class="text-center text-2xl pb-5">
          Are you sure you want to delete this Device?
        </p>
        <div class="mt-4 flex items-center gap-4">
          <n-button
            ghost
            class="flex-1 justify-center"
            color="gray"
            @click="deleteModal = false"
          >
            Close
          </n-button>
          <n-button
            strong
            class="flex-1 justify-center"
            type="primary"
            size="small"
            @click="handleDelete"
          >
            Confirm
          </n-button>
        </div>
      </div>
    </n-modal>
  </nuxt-layout>
</template>
