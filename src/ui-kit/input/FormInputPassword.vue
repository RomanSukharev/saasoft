<script setup lang="ts">
import { watch } from 'vue';

defineEmits<{
  enter: [];
}>();

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    error?: boolean;
    isEdit?: boolean;
    maxLength?: number;
  }>(),
  {
    placeholder: undefined,
    error: undefined,
    isEdit: true,
    maxLength: 100,
  },
);

const value = defineModel<string | null>();

watch(value, (newVal) => {
  if (newVal && newVal.length > (props.maxLength || 100)) {
    value.value = newVal.slice(0, props.maxLength || 100);
  }
});
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
      <PrimePassword
        v-model="value"
        toggle-mask
        :pt="{
          maskIcon:
            'absolute !top-1/2 !right-0.5 !-translate-y-1/2 text-[#88909B] select-none cursor-pointer',
          unmaskIcon:
            'absolute !top-1/2 !right-0.5 !-translate-y-1/2 text-[#88909B] select-none cursor-pointer',
          meterText: 'hidden',
        }"
        :placeholder="placeholder"
        class="flex-1 text-[#121619] outline-none bg-transparent"
        @keyup.enter="$emit('enter')"
      />
    </div>
  </div>
</template>

<style lang="scss">
input::placeholder {
  color: #88909b !important;
}
</style>
