<script setup lang="ts">
import { NTag, NDataTable } from "naive-ui";
import { TicketStatusOptions } from "~/types/enums";
import { formatDistanceStrict } from "date-fns";

const { tickets } = useTickets();

const isCriticalTime = (time: string) => {
  const inputTime = new Date(time);
  const currentTime = new Date();
  const timeDifference = inputTime.getTime() - currentTime.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return timeDifference <= 0 || timeDifference <= oneDayInMilliseconds;
};
const tableData = computed(() =>
  tickets.value
    .filter(
      (item) =>
        item.status === TicketStatusOptions.OVERDUE ||
        isCriticalTime(item.dueDate)
    )
    .map((item) => {
      return {
        details: item.title,
        priority: item.priority,
        technician: item.assignedTechnician || "Unassigned",
        due_date: item.dueDate,
      };
    })
);

const columns = [
  {
    title: "Details",
    key: "details",
  },
  {
    title: "Priority",
    key: "priority",
  },
  {
    title: "Technician",
    key: "technician",
  },
  {
    title: "Due Date",
    key: "due_date",
    render(row: any) {
      const timeDist = formatDistanceStrict(
        new Date(row.due_date),
        new Date(),
        { addSuffix: true }
      );
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
];
</script>

<template>
  <div class="flex flex-col h-64 gap-4">
    <h2 class="text-xl">Critical and Overdue Tickets</h2>
    <div class="flex flex-col gap-8 capitalize">
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :max-height="140"
        virtual-scroll
      />
    </div>
  </div>
</template>
