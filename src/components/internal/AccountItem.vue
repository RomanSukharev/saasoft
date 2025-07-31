<script setup lang="ts">
import { ref, watch } from 'vue'
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

const showHint = ref(false)

// Скрывать подсказку при вводе текста
watch(localLabel, (newVal) => {
  if (newVal.length > 0) {
    showHint.value = false
  }
})
</script>

<template>
  <div class="flex flex-row gap-2 w-full items-center relative">

    <div class="flex-1 relative">
      <FormInput
        v-model="localLabel"
        class="w-full"
        placeholder="Введите метку"
        @focus="showHint = true"
        @blur="showHint = false"
      />
      <!-- Подсказка рядом с инпутом -->
      <div
        v-if="showHint && !localLabel"
        class="absolute top-full left-0 mt-1 text-xs text-gray-600 bg-white border border-gray-300 rounded p-2 shadow-md z-10 max-w-xs"
      >
        Для указания нескольких меток пары логин/пароль используйте разделитель ;
      </div>
    </div>

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
