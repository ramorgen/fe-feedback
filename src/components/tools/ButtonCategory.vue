<template>
   <button
      @click="clicked()"
      :class="_class"
      class="text-#4661E6 px-15px py-6px bg-#F2F4FF rounded-10px hover:bg-#CFD7FF active:bg-#4661E6 active:text-white"
   >
      <p class="text-13px leading-19px font-semibold">
         <slot></slot>
      </p>
   </button>
</template>

<script setup>
   import { useSlots } from "vue"
   const store = inject("store")

   const props = defineProps({
      clickable: {
         type: Boolean,
         default: true,
         // false if used in SuggestionCard
      },
   })

   const slots = useSlots()
   const slotContent = slots.default()[0].children

   const _class = computed(() => {
      return props.clickable && store.activeSuggestionFilter === slotContent ? "active" : ""
   })

   const clicked = () => {
      if (props.clickable) {
         store.activeSuggestionFilter = slotContent
      }
   }
</script>

<style scoped>
   .active {
      background-color: #4661e6;
      color: white;
   }
</style>
