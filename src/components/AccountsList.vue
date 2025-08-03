<script setup lang="ts">
import { ref } from 'vue';
import AccountAdd from './AccountAdd.vue';
import AccountItem from './AccountItem.vue';
import { headers } from '@/constants';
import { useAccountsStore } from '@/stores/useAccountsStore';
import { storeToRefs } from 'pinia';

const isTriedToAdd = ref(false);
const store = useAccountsStore();
const { accounts } = storeToRefs(store);

function onAddAccount() {
  isTriedToAdd.value = true;

  const wasAdded = store.tryAddAccount();

  if (wasAdded) {
    isTriedToAdd.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <AccountAdd
      @add="onAddAccount"
    />

    <template v-if="accounts.length > 0">
      <div class="accounts-grid">
        <div class="accounts-headers select-none">
          <div
            v-for="header in headers"
            :key="header.id"
            class="accounts-header-item"
          >
            {{ header.title }}
          </div>
        </div>

        <div class="accounts-items">
          <AccountItem
            v-for="account in accounts"
            :key="account.id"
            :account="account"
            :show-errors="isTriedToAdd"
          />
        </div>
      </div>
    </template>

    <div v-else class="py-20 text-center select-none text-gray-400 border border-solid border-[#DDE1E6] rounded-md">
      Учетных записей пока нет
    </div>
  </div>
</template>

<style lang="scss">
.accounts-grid {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 8px;
}

.accounts-headers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 50px;
  gap: 8px;
  align-items: center;
}

.accounts-header-item {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.accounts-items {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
  gap: 8px;
}
</style>
