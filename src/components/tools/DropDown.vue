<template>
   <div
      v-if="show"
      z-10
      absolute
      bg-white
      rounded-10px
      style="box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.35)"
   >
      <div
         @click="menuClicked(item.id)"
         cursor-pointer
         v-for="item in items"
         :key="item.id"
      >
         <div flex justify-between items-center>
            <p
               class="text-#647196 hover:text-#AD1FEA text-16px leading-23px ml-24px py-12px"
            >
               {{ item.option }}
            </p>
            <div mr-24px v-if="item.id === checkId">
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
                  <path
                     fill="none"
                     stroke="#AD1FEA"
                     stroke-width="2"
                     d="M1 5.233L4.522 9 12 1"
                  />
               </svg>
            </div>
         </div>
         <div w-full h-1px class="bg-#3A4374 opacity-15"></div>
      </div>
   </div>
</template>

<script setup>
   const store = inject("store")

   const props = defineProps({
      show: Boolean,
      items: Object,
      checkId: Number,
   })
   const emit = defineEmits(["dropDownClicked"])

   const menuClicked = (id) => {
      emit("dropDownClicked", id)
   }
</script>

<style scoped></style>
