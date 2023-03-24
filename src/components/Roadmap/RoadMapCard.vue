<template>
   <div relative bg-white max-w-825px rounded-5px>
      <div absolute inset-0 h-6px :class="border"></div>
      <div mx-20px lg:mx-8>
         <div flex items-center pt-31px>
            <div w-2 h-2 class="!rounded-full" :class="border"></div>
            <p text-13px lg:text-16px class="text-#647196" ml-4>{{ status }}</p>
         </div>
         <p @click="clicked()" cursor-pointer body3 lg:h3 mt-2>{{ item.title }}</p>
         <p @click="clicked()" cursor-pointer text-13px lg:text-16px mt-1 class="text-#647196">
            {{ item.description }}
         </p>
         <ButtonCategory :clickable="false" mt-4>{{ item.category }}</ButtonCategory>
         <div mt-4 pb-6 lg:pb-8 flex justify-between items-center>
            <ButtonVote :width="300" @click="upvote()">{{ item.upvotes }}</ButtonVote>
            <div flex items-center>
               <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                     fill="#CDD2EE"
                     fill-rule="nonzero"
                  />
               </svg>
               <p ml-8px class="text-16px text-#3A4374 font-bold">
                  {{ item.replies }}
               </p>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
   const store = inject("store")

   const props = defineProps({
      status: String,
      item: Object,
   })

   const clicked = () => {
      store.feedbackItem = props.item
      store.lastComponent = "RoadMapView"
      store.activeComponent = "FeedbackDetail"
      store.isMain = false
   }
   const upvote = () => {
      props.item.upvotes++
      if (store.sortById < 3) {
         store.sortData()
      }
   }
   const border = computed(() => {
      if (props.status === "Planned") {
         return "bg-#F49F85 rounded-t-5px"
      } else if (props.status === "In-Progress") {
         return "bg-#AD1FEA rounded-t-5px"
      } else if (props.status === "Live") {
         return "bg-#62BCFA rounded-t-5px"
      }
   })
</script>

<style scoped></style>
