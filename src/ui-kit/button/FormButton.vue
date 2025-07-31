<script setup lang="ts">
defineEmits<{
  enter: [];
}>();

withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    outline?: boolean;
    required?: boolean;
    icon?: string;
    hoverRed?: boolean;
  }>(),
  {
    type: "button",
    outline: false,
    required: false,
    icon: 'pi pi-plus',
    hoverRed: false,
  },
);
</script>

<template>
  <div
    class="py-3 px-4 rounded-md"
    :class="{
      'border border-solid border-[#DDE1E6]': outline,
      'hover:text-red-500 transition-all': hoverRed
    }"
  >
  <PrimeButton
    :type="type"
    :icon="icon"
    class="p-2"
    @click="$emit('enter')"
  />
  </div>
</template>
