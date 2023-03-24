<template>
   <section
      mx-6
      sm:mx-4
      sm:mt-6
      md:mx-40px
      md:mt-56px
      lg:mx-80px
      xl:mx-120px
      xxl:mx-165px
      lg:mt-78px
   >
      <div
         relative
         h-100px
         sm:h-72px
         lg:h-113px
         flex
         justify-between
         items-center
         class="bg-#373F68 sm:rounded-10px text-white"
      >
         <div ml-6 sm:ml-8>
            <txtGoBack color="text-white" @click="goBack()" />
            <p h3 sm:h1>Roadmap</p>
         </div>
         <button @click="addClicked()" mr-6 sm:mr-10 btn btn1>+ Add Feedback</button>
      </div>
      <div sm:grid sm:grid-cols-3 sm:gap-6px md:gap-10px lg:gap-30px>
         <div mt-12>
            <p h4 lg:h3 class="text-#3A4374">Planned ({{ planned.length }})</p>
            <p text-14px lg:text-16px class="text-#647196">Ideas prioritized for research</p>
            <div mt-8 v-for="(item, index) in planned" :key="index">
               <RoadMapCard :item="item" status="Planned" />
            </div>
         </div>
         <div mt-12>
            <p h4 lg:h3 class="text-#3A4374">In-Progress ({{ inProgress.length }})</p>
            <p text-14px lg:text-16px class="text-#647196">Currently being developed</p>
            <div mt-8 v-for="(item, index) in inProgress" :key="index">
               <RoadMapCard :item="item" status="In-Progress" />
            </div>
         </div>
         <div mt-12>
            <p h4 lg:h3 class="text-#3A4374">Live ({{ live.length }})</p>
            <p text-14px lg:text-16px class="text-#647196">Released features</p>
            <div mt-8 v-for="(item, index) in live" :key="index">
               <RoadMapCard :item="item" status="Live" />
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
   import draggable from "vuedraggable"
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

   const goBack = () => {
      store.isMain = true
      store.activeComponent = undefined
   }

   const addClicked = () => {
      store.isMain = false
      store.isFeedbackAdd = true
      store.activeComponent = "FeedbackAddEdit"
   }
</script>

<style scoped></style>
