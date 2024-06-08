<script setup lang="ts">
import type { FormInst, FormValidationError, FormRules } from "naive-ui";
import { useMessage, NForm, NFormItem, NButton, NInput } from "naive-ui";

type LoginFormType = {
  email: string | null;
  password: string | null;
};

const { login } = useAuth();

const formRef = ref<FormInst | null>(null);
const loginForm = ref<LoginFormType>({
  email: null,
  password: null,
});

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordReg = /^[a-zA-Z\d]{8,}$/;

const rules: FormRules = {
  email: [
    {
      validator(_, value: string) {
        if (!emailReg.test(value)) {
          return new Error("Email is invalid");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      validator(_, value: string) {
        if (!passwordReg.test(value)) {
          return new Error("Password should contain at least 8 characters");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const handleLogin = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      login(loginForm.value.email!, loginForm.value.password!);
    } else {
      console.log(errors);
    }
  });
};
</script>

<template>
  <n-form
    ref="formRef"
    :model="loginForm"
    :rules="rules"
    class="flex flex-col gap-3 w-1/3"
  >
    <h1 class="text-2xl font-bold self-center pb-4">Login</h1>
    <n-form-item path="email" label="Email">
      <n-input v-model:value="loginForm.email" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="Password">
      <n-input
        v-model:value="loginForm.password"
        type="password"
        @keydown.enter.prevent
      />
    </n-form-item>

    <n-button
      :disabled="loginForm.email === null"
      round
      type="primary"
      @click="handleLogin"
    >
      Login
    </n-button>
  </n-form>
</template>
