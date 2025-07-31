<script setup lang="ts">
import FormInput from '@/ui-kit/input/FormInput.vue'
import FormSelect from '@/ui-kit/select/FormSelect.vue'
import FormInputPassword from '@/ui-kit/input/FormInputPassword.vue'
import FormButton from '@/ui-kit/button/FormButton.vue'
import { typeAccount } from '@/constants'
import type { IAccountProps } from '@/types'
import { useAccountItem } from '@/composables/useAccountItem'

const props = defineProps<{
  account: IAccountProps
  showErrors?: boolean
}>()

const {
  localLabel,
  localType,
  localLogin,
  localPassword,
  removeAccount,
  errors
} = useAccountItem(props)
</script>

<template>
  <div class="flex flex-row gap-2 w-full items-center">
    <FormInput
      v-model="localLabel"
      class="flex-1"
      placeholder="Введите метку"
    />

    <FormSelect
      v-model="localType"
      :items="typeAccount"
      placeholder="Тип метки"
      class="flex-1"
      :error="showErrors && errors.type ? 'Поле обязательно' : ''"
      new-select
    />

    <FormInput
      v-model="localLogin"
      :class="localType === 'ldap' ? 'flex-2' : 'flex-1'"
      :max-length="100"
      placeholder="Введите логин"
      :error="showErrors && errors.login ? 'Поле обязательно' : ''"
    />

    <FormInputPassword
      v-if="localType !== 'ldap'"
      v-model="localPassword"
      class="flex-1"
      placeholder="Введите пароль"
      :error="showErrors && errors.password ? 'Поле обязательно' : ''"
    />

    <FormButton
      icon="pi pi-trash"
      hover-red
      @click="removeAccount"
    />
  </div>
</template>
