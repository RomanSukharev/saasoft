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


<style lang="scss">
.p-toast {
  opacity: 1 !important;
}

.p-toast .p-toast-message {
  margin: 0 0 1rem 0;
  background: white;
  color: #374151;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.p-toast .p-toast-message.p-toast-message-error {
  background: #fef2f2;
  border: 1px solid #fee2e2;
  color: #991b1b;
}

.p-toast .p-toast-message.p-toast-message-error .p-toast-message-icon {
  color: #dc2626;
}

.p-toast .p-toast-message.p-toast-message-success {
  background: #f0fdf4;
  border: 1px solid #dcfce7;
  color: #166534;
}

.p-toast .p-toast-message.p-toast-message-success .p-toast-message-icon {
  color: #16a34a;
}

.p-toast .p-toast-message.p-toast-message-info {
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  color: #0c4a6e;
}

.p-toast .p-toast-message.p-toast-message-info .p-toast-message-icon {
  color: #0284c7;
}

.p-toast .p-toast-message.p-toast-message-warn {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;
}

.p-toast .p-toast-message.p-toast-message-warn .p-toast-message-icon {
  color: #d97706;
}

.p-toast .p-toast-message .p-toast-message-content {
  padding: 1rem;
  border-width: 0;
}

.p-toast .p-toast-message .p-toast-summary {
  margin: 0 0 0.25rem 0;
}

.p-toast .p-toast-message .p-toast-detail {
  margin: 0;
  line-height: 1.5;
}

.p-toast .p-toast-icon-close {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: transparent;
  color: currentColor;
  opacity: 0.5;
  transition:
    opacity 0.2s,
    background-color 0.2s;
}

.p-toast .p-toast-icon-close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}

</style>

