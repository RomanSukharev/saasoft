<script setup lang="ts">
defineEmits<{
  enter: [];
  focus: FocusEvent;
  blur: FocusEvent;
}>();


withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    error?: boolean;
    isEdit?: boolean;
    maxLength?: number;
  }>(),
  {
    type: "text",
    placeholder: undefined,
    error: undefined,
    isEdit: true,
    maxLength: 50,
  },
);

const value = defineModel<string | null>();
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
      <input
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxLength"
        class="flex-1 text-[#121619] outline-none bg-transparent"
        @keyup.enter="$emit('enter')"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </div>
  </div>
</template>

<style lang="scss">
input::placeholder {
  color: #88909b;
}
</style>
