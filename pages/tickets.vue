<script setup lang="ts">
import useTickets from "~/composables/api/useTickets";
import { NTag, NDataTable, NBadge, NButton, NFlex, NModal } from "naive-ui";
import { formatDistanceStrict } from "date-fns";
import { TicketActivityStatusOptions } from "~/types/enums";

const { tickets } = useTickets();

const editModal = ref(false);
const addModal = ref(false);
const ticketIdToEdit = ref("");

const handleEdit = (ticket: any) => {
  ticketIdToEdit.value = ticket.id;
  editModal.value = true;
};
const handleAdd = () => {
  ticketIdToEdit.value = "";
  addModal.value = true;
};

const tableData = computed(() =>
  tickets.value.map((ticket) => {
    return {
      id: ticket.id,
      title: ticket.title,
      priority: ticket.priority,
      dueDate: ticket.dueDate,
      activityStatus: ticket.activityStatus,
      assignedTechnician: ticket.assignedTechnician || "Unassigned",
      status: ticket.status,
      actions: "Edit",
    };
  })
);

const columns = [
  {
    title: "Title",
    key: "title",
  },
  {
    title: "Priority",
    key: "priority",
  },
  {
    title: "Assigned Technician",
    key: "assignedTechnician",
  },
  {
    title: "Due Date",
    key: "due_date",
    render(row: any) {
      const timeDist = formatDistanceStrict(new Date(row.dueDate), new Date(), {
        addSuffix: true,
      });
      return h(
        NTag,
        {
          bordered: false,
          type: timeDist.includes("ago") ? "error" : "warning",
        },
        {
          default: () => timeDist,
        }
      );
    },
  },
  {
    title: "Activity Status",
    key: "activityStatus",
    render(row: any) {
      return h(NFlex, { class: "items-center" }, [
        h(NBadge, {
          color:
            row.activityStatus === TicketActivityStatusOptions.AWAITING
              ? "green"
              : row.activityStatus === TicketActivityStatusOptions.UNREAD
                ? "yellow"
                : "gray",
          dot: true,
        }),
        h(
          "span",
          {},
          row.activityStatus === TicketActivityStatusOptions.AWAITING
            ? "Awaiting Response"
            : row.activityStatus === TicketActivityStatusOptions.UNREAD
              ? "Unread"
              : "Read"
        ),
      ]);
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
          type:
            row.status === "open"
              ? "info"
              : row.status === "pending"
                ? "warning"
                : "error",
        },
        {
          default: () => row.status,
        }
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render(row: any) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          class: "m-2",
          onClick: () => handleEdit(row),
        },
        { default: () => row.actions }
      );
    },
  },
];
</script>

<template>
  <nuxt-layout name="dashboard">
    <div class="flex flex-col w-full gap-8 capitalize">
      <div class="flex w-full items-center pt-4 justify-between">
        <h1 class="text-3xl">Tickets</h1>
        <n-button type="primary" size="medium" @click="handleAdd">
          Add Ticket
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
      <tickets-form
        ticket-form-modal-type="edit"
        :ticket-id-to-edit="ticketIdToEdit"
        @close="editModal = false"
      />
    </n-modal>
    <n-modal v-model:show="addModal">
      <tickets-form ticket-form-modal-type="add" @close="addModal = false" />
    </n-modal>
  </nuxt-layout>
</template>
