<template>
   <div relative>
      <p h4 mt-6 class="text-#647196"><slot></slot></p>
      <p class="text-#647196 text-14px"><slot name="title2"></slot></p>
      <div
         @click="showMenu = !showMenu"
         mt-4
         h-48px
         flex
         justify-between
         items-center
         cursor-pointer
         class="bg-#F7F8FD"
      >
         <p ml-6>{{ activeOption }}</p>
         <div class="text-#4661E6" mr-6 v-if="!showMenu">
            <chevronDown />
         </div>
         <div class="text-#4661E6" mr-6 v-else>
            <chevronUp />
         </div>
      </div>
      <!-- Dropdown menu -->
      <DropDown
         w-full
         top-120px
         :items="ddItems"
         :show="showMenu"
         :checkId="checkId"
         @dropDownClicked="ddClicked"
      />
   </div>
</template>

<script setup>
   const store = inject("store")

   const props = defineProps({
      ddItems: Object,
      fbRecord: Object,
      isAdd: Boolean,
      memberName: String,
   })
   const showMenu = ref(false)

   const checkId = ref()
   if (props.isAdd) {
      checkId.value = 1
   } else {
      checkId.value =
         props.ddItems[
            props.ddItems.findIndex((item) => item.option === props.fbRecord[props.memberName])
         ].id
   }
   // find the active option shown above <DrodDown> :
   const activeOption = computed(() => {
      return props.ddItems[props.ddItems.findIndex((item) => item.id === checkId.value)].option
   })

   const ddClicked = (id) => {
      checkId.value = id
      props.fbRecord[props.memberName] = activeOption.value
      showMenu.value = false
   }
</script>

<style scoped></style>
