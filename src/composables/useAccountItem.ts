import {  computed } from 'vue'
import type { IAccountProps } from '@/types'
import { useAccountsStore } from '@/stores/useAccountsStore'

export function useAccountItem(props: {
  account: IAccountProps
  showErrors?: boolean
}) {
  const accountsStore = useAccountsStore()

  const localLabel = computed({
    get: () => {
      return Array.isArray(props.account.label)
        ? props.account.label.map((item) => item.text).join(';')
        : ''
    },
    set: (value: string) => {
      const parsedLabel = value
        .split(';')
        .map((text) => text.trim())
        .filter((text) => text.length > 0)
        .map((text) => ({ text }))

      accountsStore.updateAccount(props.account.id, 'label', parsedLabel)
    }
  })

  const localType = computed({
    get: () => props.account.type,
    set: (value: string) => {
      if (value === 'ldap') {
        accountsStore.updateAccount(props.account.id, 'password', null)
      }
      accountsStore.updateAccount(props.account.id, 'type', value)
    }
  })

  const localLogin = computed({
    get: () => props.account.login,
    set: (value: string) => {
      accountsStore.updateAccount(props.account.id, 'login', value)
    }
  })

  const localPassword = computed({
    get: () => props.account.password,
    set: (value: string | null) => {
      accountsStore.updateAccount(props.account.id, 'password', value)
    }
  })

  const removeAccount = () => {
    accountsStore.removeAccount(props.account.id)
  }

  const errors = computed(() => ({
    label: localLabel.value.trim() === '',
    type: !localType.value,
    login: localLogin.value.trim() === '',
    password: localType.value !== 'ldap' && (!localPassword.value || localPassword.value.trim() === ''),
  }))

  return {
    localLabel,
    localType,
    localLogin,
    localPassword,
    removeAccount,
    errors
  }
}
