<template>
   <main h-full pb-6 relative>
      <section
         v-if="store.data && store.isMain"
         flex
         :class="{
            'flex-row justify-center': store.wWidth > 1149,
            'flex-col items-center': store.wWidth < 1150,
         }"
      >
         <menu>
            <MenuGroup />
         </menu>
         <div class="md:mt-40px lg:mt-94px lg:ml-30px lg:w-825px">
            <MenuBar />
            <div class="_scrollmain" overflow-y-scroll overscroll-contain v-if="data.length > 0">
               <SuggestionCard
                  v-for="(item, index) in data"
                  :key="index"
                  :item="item"
                  mt-24px
                  mx-6
                  md:mx-0
               ></SuggestionCard>
            </div>
            <div v-else flex justify-center>
               <SuggestionEmpty />
            </div>
         </div>
      </section>
      <section
         v-else
         flex
         h-screen
         :class="{
            'flex-row justify-center': store.wWidth > 1149,
            'flex-col items-center': store.wWidth < 1150,
         }"
      >
         <component overflow-y-scroll :is="activeComponent"></component>
      </section>
   </main>
</template>

<script setup>
   import store from "@/store"
   import d from "./data.json"
   import FeedbackDetail from "./components/Feedback/FeedbackDetail.vue"
   import FeedbackAddEdit from "./components/Feedback/FeedbackAddEdit.vue"
   import RoadMapView from "./components/Roadmap/RoadMapView.vue"
   provide("store", store)

   const data = computed(() => {
      return store.getData()
   })

   onMounted(() => {
      store.setData(d)
   })
   const components = {
      FeedbackDetail: FeedbackDetail,
      FeedbackAddEdit: FeedbackAddEdit,
      RoadMapView: RoadMapView,
   }
   const activeComponent = computed(() => {
      return components[store.activeComponent]
   })
</script>

<style>
   #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
   }

   ._scrollmain {
      height: calc(100vh - 128px);
   }

   @media (min-width: 768px) {
      ._scrollmain {
         height: calc(100vh - 370px);
      }
   }
   @media (min-width: 1150px) {
      ._scrollmain {
         height: calc(100vh - 210px);
      }
   }
   .v-enter-active,
   .v-leave-active {
      transition: opacity 0.3s ease;
   }

   .v-enter-from,
   .v-leave-to {
      opacity: 0;
   }
</style>
