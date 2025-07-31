import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IAccountProps } from '@/types'
import { useToast } from 'primevue'

export const useAccountsStore = defineStore('accounts', () => {
  const toast = useToast()
  const accounts = ref<IAccountProps[]>([])
  const nextId = computed(() => {
    const maxId = accounts.value.reduce((max, account) =>
      Math.max(max, account.id), 0)
    return maxId + 1
  })

  const createEmptyAccount = (): IAccountProps => ({
    id: nextId.value,
    label: [],
    type: null,
    login: '',
    password: ''
  })

  const addAccount = (): number => {
    const newAccount = createEmptyAccount();
    accounts.value.push(newAccount);
    return newAccount.id;
  }


  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter(account => account.id !== id);

    toast.add({
      severity: "success",
      summary: "Успех",
      detail: "Вы успешно удалили запись",
      life: 5000,
    });
  }

  const updateAccount = <K extends keyof IAccountProps>(
    id: number,
    field: K,
    value: IAccountProps[K]
  ) => {
    const account = accounts.value.find(a => a.id === id)
    if (account && field !== 'id') {
      account[field] = value
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount
  }
}, {
  persist: true
})
