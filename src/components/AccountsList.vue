<!-- AccountsList.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import AccountAdd from './AccountAdd.vue';
import AccountItem from './AccountItem.vue';
import { accountTableHeaders } from '@/constants';
import { useAccountsStore } from '@/stores/useAccountsStore';
import type { IAccountProps } from '@/types';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue'

const store = useAccountsStore();
const { accounts } = storeToRefs(store);
const toast = useToast()

const isTriedToAdd = ref(false);

const isAccountValid = (account: IAccountProps) => {
  return (
    typeof account.type === 'string' && account.type.trim() !== '' &&
    typeof account.login === 'string' && account.login.trim() !== '' &&
    (account.type === 'ldap' || (typeof account.password === 'string' && account.password.trim() !== ''))
  );
};

function onAddAccount() {
  isTriedToAdd.value = true;

  const lastAccount = accounts.value[accounts.value.length - 1];

  if (lastAccount && !isAccountValid(lastAccount)) {
    toast.add({
      severity: "warn",
      summary: "Предупреждение",
      detail: "Обязательные поля должны быть заполнены",
      life: 5000,
    });
    return;
  }

  isTriedToAdd.value = false;
  store.addAccount();
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <AccountAdd @add="onAddAccount" />

    <template v-if="accounts.length > 0">
      <div class="accounts-grid">
        <!-- Заголовки -->
        <div class="accounts-headers">
          <div
            v-for="header in accountTableHeaders"
            :key="header.id"
            class="accounts-header-item"
          >
            {{ header.title }}
          </div>
        </div>

        <!-- Элементы аккаунтов -->
        <div class="accounts-items">
          <AccountItem
            v-for="(account, index) in accounts"
            :key="account.id"
            :account="account"
            :show-errors="isTriedToAdd && index === accounts.length - 1"
          />
        </div>
      </div>
    </template>

    <div v-else class="py-4 text-center text-gray-500 border border-solid border-[#DDE1E6] rounded-md">
      Учетных записей пока нет
    </div>
  </div>
</template>

<style scoped>
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
