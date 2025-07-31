import { ref, watch, computed } from 'vue'
import type { IAccountProps } from '@/types'
import { useAccountsStore } from '@/stores/useAccountsStore'

export function useAccountItem(props: {
  account: IAccountProps
  showErrors?: boolean
}) {
  const accountsStore = useAccountsStore()

  const localLabel = ref(
    Array.isArray(props.account.label)
      ? props.account.label.map((item) => item.text).join(';')
      : ''
  )

  const localType = ref(props.account.type)
  const localLogin = ref(props.account.login)
  const localPassword = ref(props.account.password)

  watch(localType, (newType) => {
    if (newType === 'ldap') {
      localPassword.value = null
    }
  })

  watch([localLabel, localType, localLogin, localPassword], () => {
    const parsedLabel = localLabel.value
      .split(';')
      .map((text) => text.trim())
      .filter((text) => text.length > 0)
      .map((text) => ({ text }))

    accountsStore.updateAccount(props.account.id, 'label', parsedLabel)
    accountsStore.updateAccount(props.account.id, 'type', localType.value)
    accountsStore.updateAccount(props.account.id, 'login', localLogin.value)
    accountsStore.updateAccount(props.account.id, 'password', localPassword.value)
  })

  const removeAccount = () => {
    accountsStore.removeAccount(props.account.id)
  }

  const errors = computed(() => ({
    label: localLabel.value.trim() === '',
    type: !localType.value,
    login: localLogin.value.trim() === '',
    password: localType.value !== 'ldap' && (!localPassword.value || localPassword.value.trim() === ''),
  }));

  return {
    localLabel,
    localType,
    localLogin,
    localPassword,
    removeAccount,
    errors
  }
}
