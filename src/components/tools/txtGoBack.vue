<template>
   <div go_back flex flex-row items-center :class="[color]">
      <span class="mr-15px"
         ><svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M6 9L2 5l4-4"
               stroke="currentColor"
               stroke-width="2"
               fill="none"
               fill-rule="evenodd"
            /></svg></span
      >Go back
   </div>
</template>

<script setup>
   const store = inject("store")

   const props = defineProps({
      color: {
         type: String,
         default: "text-#647196",
      },
   })
</script>

<style scoped></style>
