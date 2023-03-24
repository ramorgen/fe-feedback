<template>
   <div class="w-223px h-178px lg:w-255px" bg-white rounded-10px>
      <div pt-19px px-24px flex justify-between items-center>
         <p h3 class="text-#3A4374">Roadmap</p>
         <button
            @click="clicked()"
            text-13px
            font-semibold
            underline
            class="text-#4661E6 hover:text-#8397F8"
         >
            View
         </button>
      </div>
      <div pt-24px px-24px flex justify-between items-center>
         <div flex items-center>
            <div class="bg-#F49F85 w-8px h-8px rounded-full"></div>
            <p pl-4 body1 class="text-#647196">Planned</p>
         </div>
         <p body1 class="!font-bold text-#647196">{{ planned.length }}</p>
      </div>
      <div pt-2 px-24px flex justify-between items-center>
         <div flex items-center>
            <div class="bg-#AD1FEA w-8px h-8px rounded-full"></div>
            <p pl-4 body1 class="text-#647196">In-Progress</p>
         </div>
         <p body1 class="!font-bold text-#647196">{{ inProgress.length }}</p>
      </div>
      <div pt-2 px-24px flex justify-between items-center>
         <div flex items-center>
            <div class="bg-#62BCFA w-8px h-8px rounded-full"></div>
            <p pl-4 body1 class="text-#647196">Live</p>
         </div>
         <p body1 class="!font-bold text-#647196">{{ live.length }}</p>
      </div>
   </div>
</template>

<script setup>
   const store = inject("store")

   const planned = computed(() => {
      return store.data.productRequests.filter((item) => {
         return item.status === "Planned"
      })
   })

   const inProgress = computed(() => {
      return store.data.productRequests.filter((item) => {
         return item.status === "In-progress"
      })
   })

   const live = computed(() => {
      return store.data.productRequests.filter((item) => {
         return item.status === "Live"
      })
   })

   const clicked = () => {
      store.isMain = false
      store.lastComponent = store.activeComponent = "RoadMapView"
   }
</script>

<style scoped></style>
