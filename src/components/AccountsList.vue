<script setup lang="ts">
import { ref } from 'vue';
import AccountAdd from './internal/AccountAdd.vue';
import AccountItem from './internal/AccountItem.vue';
import { accountTableHeaders } from '@/constants';
import { useAccountsStore } from '@/stores/useAccountsStore';
import type { TAny } from '@/types';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue'

const store = useAccountsStore();
const { accounts } = storeToRefs(store);
const toast = useToast()

const isTriedToAdd = ref(false);

const isAccountValid = (account: TAny) => {
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
      <div class="flex flex-row gap-2 w-full text-sm font-medium text-gray-500">
        <div
          v-for="header in accountTableHeaders"
          :key="header.id"
          :class="header.class"
        >
          {{ header.title }}
        </div>
      </div>

      <AccountItem
        v-for="(account, index) in accounts"
        :key="account.id"
        :account="account"
        :show-errors="isTriedToAdd && index === accounts.length - 1"
      />
    </template>

    <div v-else class="py-4 text-center text-gray-500 border border-solid border-[#DDE1E6] rounded-md">
      Учетных записей пока нет
    </div>
  </div>
</template>
