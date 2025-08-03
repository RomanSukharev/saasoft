<script setup lang="ts">
defineEmits<{
  enter: [];
}>();

withDefaults(
  defineProps<{
    type?: string;
    outline?: boolean;
    icon?: string;
    hover?: boolean;
  }>(),
  {
    type: "button",
    outline: false,
    icon: 'pi pi-plus',
    hover: false,
  },
);
</script>

<template>
  <div
    class="py-3 px-4 cursor-pointer rounded-md"
    :class="{
      'border border-solid border-[#DDE1E6]': outline,
      'hover:text-red-500 transition-all': hover
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
