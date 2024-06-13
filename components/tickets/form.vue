<script setup lang="ts">
import {
  NButton,
  NForm,
  NGrid,
  NFormItemGi,
  NInput,
  NSelect,
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

const { createTicket, updateTicket, tickets, fetchTickets } = useTickets();

const ticketToEdit = computed(() =>
  tickets.value.find((ticket) => ticket.id === props.ticketIdToEdit)
);

const formRef = ref<FormInst | null>(null);
const model = ref({
  name: ticketToEdit.value?.name || "",
  availability: ticketToEdit.value?.availability || "",
  type: ticketToEdit.value?.type || "",
});

const typeOptions = Object.values(TicketPriorityOptions).map((status) => ({
  label: status,
  value: status,
}));
const availabilityOptions = Object.values(TicketActivityStatusOptions).map(
  (status) => ({
    label: status,
    value: status,
  })
);

const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "Please input ticket name",
  },

  availability: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select ticket availability",
  },
  type: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select ticket type",
  },
};

const handleSave = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (props.ticketFormModalType === "edit" && ticketToEdit.value) {
        const res = await updateTicket(props.ticketIdToEdit, model.value);
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
        <n-form-item-gi :span="24" label="Ticket Name" path="name">
          <n-input v-model:value="model.name" placeholder="Ticket Name" />
        </n-form-item-gi>

        <n-form-item-gi
          :span="12"
          label="Ticket Availability"
          path="availability"
        >
          <n-select
            v-model:value="model.availability"
            placeholder="Select availability"
            :options="availabilityOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Ticket Type" path="type">
          <n-select
            v-model:value="model.type"
            placeholder="Select type"
            :options="typeOptions"
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
