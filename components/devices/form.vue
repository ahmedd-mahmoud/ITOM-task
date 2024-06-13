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
import { DeviceAvailabilityOptions, DeviceTypeOptions } from "~/types/enums";
import { Close } from "@vicons/ionicons5";
import type { DeviceResponse } from "~/types/api";

const props = defineProps({
  deviceFormModalType: {
    type: String,
    required: true,
  },
  deviceIdToEdit: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const { createDevice, updateDevice, devices, fetchDevices } = useDevices();

const deviceToEdit = computed(() =>
  devices.value.find((device) => device.id === props.deviceIdToEdit)
);

const formRef = ref<FormInst | null>(null);
const model = ref({
  name: deviceToEdit.value?.name || "",
  availability: deviceToEdit.value?.availability || "",
  type: deviceToEdit.value?.type || "",
});

const typeOptions = Object.values(DeviceTypeOptions).map((status) => ({
  label: status,
  value: status,
}));
const availabilityOptions = Object.values(DeviceAvailabilityOptions).map(
  (status) => ({
    label: status,
    value: status,
  })
);

const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "Please input device name",
  },

  availability: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select device availability",
  },
  type: {
    required: true,
    trigger: ["blur", "change"],
    message: "Please select device type",
  },
};

const handleSave = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (props.deviceFormModalType === "edit" && deviceToEdit.value) {
        const res = await updateDevice(props.deviceIdToEdit, model.value);
        devices.value = devices.value.map((device) => {
          if (device.id === res?.id) {
            return res;
          }
          return device;
        });
      } else {
        const data = await createDevice(model.value);
        devices.value.push(data as DeviceResponse);
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
        {{ deviceFormModalType === "add" ? "Add Device" : "Edit Device" }}
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
        <n-form-item-gi :span="24" label="Device Name" path="name">
          <n-input v-model:value="model.name" placeholder="Device Name" />
        </n-form-item-gi>

        <n-form-item-gi
          :span="12"
          label="Device Availability"
          path="availability"
        >
          <n-select
            v-model:value="model.availability"
            placeholder="Select availability"
            :options="availabilityOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Device Type" path="type">
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
