<template>
  <button class="button" :class="{ disabled }">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.button {
  @apply px-2;
  @apply py-1;
  @apply bg-gray-6;
  @apply text-gray-2;
  @apply select-none;

  &:hover {
    @apply bg-gray-5;
  }

  &:active {
    @apply bg-gray-4;
  }
}
</style>
