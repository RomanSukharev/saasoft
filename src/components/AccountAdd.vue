<script setup lang="ts">
import FormButton from '@/ui-kit/button/FormButton.vue';

const emit = defineEmits<{
  add: []
}>()

function onCreateAccount(): void {
  emit('add')
}
</script>

<template>
  <div class="flex items-center gap-3">
    <span class="text-base select-none font-semibold">Учетные записи</span>

    <FormButton
      outline
      icon="pi pi-plus"
      @click="onCreateAccount"
    />
  </div>
</template>
