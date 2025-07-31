<script setup lang="ts">
import type { TAny } from '@/types';
import { ref } from 'vue';

withDefaults(
  defineProps<{
    placeholder?: string;
    error?: string;
    required?: boolean;
    items?: TAny[];
    keyProperty?: string;
    displayProperty?: string;
    newSelect?: boolean;
    disabled?: boolean;
    isEdit?: boolean;
  }>(),
  {
    placeholder: undefined,
    error: undefined,
    items: () => [],
    keyProperty: "id",
    displayProperty: "title",
    newSelect: false,
    disabled: false,
    isEdit: true,
  },
);

const value = defineModel<TAny>();
const isOpen = ref(false);
</script>

<template>
  <div class="flex self-stretch justify-center items-center flex-col w-full">

    <div
     class="flex self-stretch justify-start items-center flex-row py-3 px-4 bg-[#FFFFFF] rounded-md border"
      :class="{
        'border-[#DDE1E6]': isEdit && !error,
        'border-red-500': !!error
      }"
    >
      <PrimeSelect
        v-if="newSelect"
        v-model="value"
        class="w-full"
        :required="required"
        :pt="{
          label: '',
          overlay: '!bg-[#FFFFFF] !shadow !rounded-md',
          option: '!hover:bg-[#F5F5F5] !rounded-md p-2 !transition-all !m-1',
          dropdownIcon: `transition-all ml-1 text-[#88909B] ${isOpen ? '-rotate-180' : ''}`,
        }"
        :options="items"
        :option-label="displayProperty"
        :option-value="keyProperty"
        :placeholder="placeholder"
        :disabled="disabled"
        @show="isOpen = true"
        @hide="isOpen = false"
      />
    </div>

  </div>
</template>

<style lang="scss">
input::placeholder {
  color: #88909B !important;
}
</style>
