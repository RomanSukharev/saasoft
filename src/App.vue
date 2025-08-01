<script setup lang="ts">
import AccountsList from './components/AccountsList.vue';

const toastStyle = {
  messageIcon: {
    class: "mt-1 mr-1",
  },
  text: {
    class: "ml-3",
  },
  summary: {
    class: "text-sm font-semibold mb-1",
  },
  detail: {
    class: "text-sm opacity-90",
  },
  icon: {
    class: "mt-1 text-xl flex-shrink-0",
  },
  closeButton: {
    class:
      "w-4 h-4 ml-auto mt-1 opacity-60 hover:opacity-100 transition-opacity",
  },
};

</script>

<template>
  <div class="p-2.5 flex flex-col gap-3">
    <AccountsList />

    <PrimeToast :pt="toastStyle"/>
  </div>
</template>
