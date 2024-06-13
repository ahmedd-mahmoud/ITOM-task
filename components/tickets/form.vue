<script setup lang="ts">
import {
  NButton,
  NForm,
  NGrid,
  NFormItemGi,
  NInput,
  NSelect,
  NDatePicker,
  type FormInst,
} from "naive-ui";
import {
  TicketActivityStatusOptions,
  TicketPriorityOptions,
  TicketStatusOptions,
} from "~/types/enums";
import { Close } from "@vicons/ionicons5";
import type { TicketResponse } from "~/types/api";

const props = defineProps({
  ticketFormModalType: {
    type: String,
    required: true,
  },
  ticketIdToEdit: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const { createTicket, updateTicket, tickets } = useTickets();

const ticketToEdit = computed(() =>
  tickets.value.find((ticket) => ticket.id === props.ticketIdToEdit)
);

const formRef = ref<FormInst | null>(null);
const model = ref({
  title: ticketToEdit.value?.title || "",
  priority: ticketToEdit.value?.priority || "",
  assignedTechnician: ticketToEdit.value?.assignedTechnician || "",
  dueDate: new Date(ticketToEdit.value?.dueDate || "").getTime(),
  activityStatus: ticketToEdit.value?.activityStatus || "",
  status: ticketToEdit.value?.status || "",
});

const priorityOptions = Object.values(TicketPriorityOptions).map((status) => ({
  label: status,
  value: status,
}));

const activityStatusOptions = Object.values(TicketActivityStatusOptions).map(
  (status) => ({
    label: status,
    value: status,
  })
);

const statusOptions = Object.values(TicketStatusOptions).map((status) => ({
  label: status,
  value: status,
}));

const rules = {
  title: {
    required: true,
    trigger: ["blur", "input"],
    message: "Please input ticket title",
  },

  priority: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select ticket priority",
  },
  activityStatus: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select ticket activity status",
  },
  status: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select ticket status",
  },
};

const handleSave = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (props.ticketFormModalType === "edit" && ticketToEdit.value) {
        const res = await updateTicket(props.ticketIdToEdit, {
          ...model.value,
          dueDate: new Date(model.value.dueDate).toISOString(),
        });
        tickets.value = tickets.value.map((ticket) => {
          if (ticket.id === res?.id) {
            return res;
          }
          return ticket;
        });
      } else {
        const data = await createTicket(model.value);
        tickets.value.push(data as TicketResponse);
      }
    }
  });

  emit("close");
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4 capitalize bg-black">
    <div class="flex items-center justify-between">
      <p class="capitalize">
        {{ ticketFormModalType === "add" ? "Add Ticket" : "Edit Ticket" }}
      </p>
      <n-button
        @click="$emit('close')"
        :render-icon="renderIcon(Close)"
        ghost
        circle
      />
    </div>

    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      size="medium"
      label-placement="top"
    >
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="24" label="Ticket Title" path="title">
          <n-input v-model:value="model.title" placeholder="Ticket Title" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Ticket Priority" path="priority">
          <n-select
            v-model:value="model.priority"
            placeholder="Select priority"
            :options="priorityOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Ticket Due Date" path="dueDate">
          <n-date-picker v-model:value="model.dueDate" type="datetime" />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="Ticket Activity status"
          path="activityStatus"
        >
          <n-select
            v-model:value="model.activityStatus"
            placeholder="Select activityStatus"
            :options="activityStatusOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Ticket status" path="status">
          <n-select
            v-model:value="model.status"
            placeholder="Select status"
            :options="statusOptions"
          />
        </n-form-item-gi>
      </n-grid>

      <n-button
        class="mt-4 w-full h-11 cursor-pointer justify-center"
        type="primary"
        @click="handleSave"
      >
        Save
      </n-button>
    </n-form>
  </div>
</template>
