<template>
   <div bg-white max-w-825px rounded-10px>
      <div px-6 py-6 md:px-32px md:py-28px md:flex md:justify-between>
         <div flex items-start>
            <ButtonVote @click="upvote()" v-if="containerWidth > 767">{{
               item.upvotes
            }}</ButtonVote>
            <div cursor-pointer @click="clicked()" md:ml-40px>
               <p h3>{{ item.title }}</p>
               <p class="pt-1px text-16px leading-23px text-#647196">
                  {{ item.description }}
               </p>
               <ButtonCategory :clickable="false" mt-16px>{{ item.category }}</ButtonCategory>
            </div>
         </div>
         <div mt-4 md:mt-0 flex justify-between md:block>
            <ButtonVote @click="upvote()" v-if="containerWidth < 768">{{
               item.upvotes
            }}</ButtonVote>
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
      item: Object,
      width: {
         type: Number,
         default: 0,
      },
   })
   const containerWidth = computed(() => {
      return props.width === 0 ? store.wWidth : props.width
   })

   const upvote = () => {
      props.item.upvotes++
      if (store.sortById < 3) {
         store.sortData()
      }
   }

   const clicked = () => {
      store.feedbackItem = props.item
      store.activeComponent = "FeedbackDetail"
      store.isMain = false
   }
</script>

<style scoped></style>
