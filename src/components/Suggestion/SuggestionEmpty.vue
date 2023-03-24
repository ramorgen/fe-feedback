<template>
   <div
      bg-white
      mt-8
      md:mt-6
      w-327px
      h-480px
      md:w-689px
      md:h-600px
      md:mb-54px
      lg:w-825px
      rounded-10px
      grid
      place-content-center
   >
      <div class="md:w-410px flex flex-col items-center">
         <img src="/suggestions/illustration-empty.svg" alt="" />
         <p h1 mt-53px>There is no feedback yet.</p>
         <p mt-4 body1 text-center class="text-#647196">
            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas
            to improve our app.
         </p>
         <button @click="addClicked()" mt-48px btn btn1>+ Add Feedback</button>
      </div>
   </div>
</template>

<script setup>
   const store = inject("store")

   const addClicked = () => {
      store.isMain = false
      store.isFeedbackAdd = true
      store.activeComponent = "FeedbackAddEdit"
   }
</script>

<style scoped></style>
