<template>
   <button
      flex
      items-center
      justify-center
      px-5
      py-10px
      rounded-10px
      :class="_classButton"
      class="text-#3A4374 bg-#F2F4FF hover:bg-#CFD7FF active:bg-#4661E6 active:text-white"
   >
      <span class="text-#4661E6 mr-10px" :class="_classIcon">
         <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M1 6l4-4 4 4"
               stroke="currentColor"
               stroke-width="2"
               fill="none"
               fill-rule="evenodd"
            />
         </svg>
      </span>
      <p class="text-13px leading-19px font-bold -tracking-.18px">
         <slot></slot>
      </p>
   </button>
</template>

<script setup>
   const store = inject("store")
   const props = defineProps({
      width: {
         type: Number,
         default: 0,
      },
   })

   const containerWidth = computed(() => {
      return props.width === 0 ? store.wWidth : props.width
   })

   const _classButton = computed(() => {
      return containerWidth.value > 767 ? "!flex-col !px-11px" : "flex-row"
   })

   const _classIcon = computed(() => {
      return containerWidth.value > 767 ? "!mb-2 !mr-0" : ""
   })
</script>

<style scoped></style>
