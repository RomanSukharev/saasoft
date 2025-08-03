<script setup lang="ts">
import { ref } from 'vue'
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

const showHint = ref(false)

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
  <div class="account-item-grid">
    <div class="account-item-field relative">
      <FormInput
        v-model="localLabel"
        placeholder="Введите метку"
        @focus="showHint = true"
        @blur="showHint = false"
      />
      <div
        v-if="showHint && !localLabel"
        class="absolute top-full left-0 mt-1 text-xs text-gray-600 bg-white border border-gray-300 rounded p-2 shadow-md z-10 max-w-xs"
      >
        Для указания нескольких меток пары логин/пароль используйте разделитель ;
      </div>
    </div>

    <div class="account-item-field">
      <FormSelect
        v-model="localType"
        :items="typeAccount"
        placeholder="Тип метки"
        :error="showErrors && errors.type"
        new-select
      />
    </div>

    <div class="account-item-field" :class="{ 'field-ldap': localType === 'ldap' }">
      <FormInput
        v-model="localLogin"
        :max-length="100"
        placeholder="Введите логин"
        :error="showErrors && errors.login"
      />
    </div>

    <div class="account-item-field" v-if="localType !== 'ldap'">
      <FormInputPassword
        v-model="localPassword"
        placeholder="Введите пароль"
        :error="showErrors && errors.password"
      />
    </div>

    <div class="account-item-button">
      <FormButton
        icon="pi pi-trash"
        hover
        @click="removeAccount"
      />
    </div>
  </div>
</template>

<style lang="scss">
.account-item-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 8px;
  align-items: center;
}

.account-item-field {
  width: 100%;
}

.field-ldap {
  grid-column: span 2;
}

.account-item-button {
  display: flex;
  justify-content: flex-end;
}
</style>
