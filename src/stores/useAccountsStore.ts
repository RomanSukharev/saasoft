import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IAccountProps } from '@/types'
import { useToast } from 'primevue'
import { isAccountValid } from '@/helpers/accountValidity'

export const useAccountsStore = defineStore('accounts', () => {
  const toast = useToast()
  const accounts = ref<IAccountProps[]>([])

  const nextId = computed(() => {
    if (accounts.value.length === 0) return 1
    const lastAccount = [...accounts.value].sort((a, b) => a.id - b.id).pop()
    return lastAccount ? lastAccount.id + 1 : 1
  })

  const createEmptyAccount = (): IAccountProps => ({
    id: nextId.value,
    label: [],
    type: '',
    login: '',
    password: ''
  })

  const addAccount = (): number => {
    const newAccount = createEmptyAccount()
    accounts.value.push(newAccount)
    return newAccount.id
  }

  const removeAccount = (id: number) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Вы успешно удалили учетную запись",
        life: 5000,
      })
    }
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

  const tryAddAccount = (): boolean => {
    const hasInvalid = accounts.value.some(acc => !isAccountValid(acc))

    if (hasInvalid) {
      toast.add({
        severity: "warn",
        summary: "Предупреждение",
        detail: "Обязательные поля должны быть заполнены",
        life: 5000,
      })
      return false
    }

    addAccount()
    return true
  }


  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    tryAddAccount
  }
}, {
  persist: true
})
