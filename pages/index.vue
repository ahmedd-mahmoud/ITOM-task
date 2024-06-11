<template>
  <nuxt-layout name="dashboard">
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl">Dashboard</h1>
      <div class="flex flex-col md:flex-row items-center gap-4">
        <div class="flex flex-col gap-4">
          <dashboard-alerts-status />
          <dashboard-alerts-recent-alerts />
        </div>
        <div class="flex flex-col gap-4">
          <dashboard-tickets-status />
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>
