<template>
   <section w-327px md:w-689px lg:w-730px mt-6 md:mt-80px>
      <div flex justify-between>
         <txtGoBack @click="goBack()" />
         <button @click="editFeedback()" btn btn_blue>Edit Feedback</button>
      </div>
      <SuggestionCard mt-6 :item="store.feedbackItem" />

      <div mt-6 bg-white rounded-10px class="_scroll" overflow-y-auto>
         <p pt-6 ml-6 mb-6 md:mb-7 md:ml-34px h3>
            {{ store.feedbackItem.replies }} Comment{{
               store.feedbackItem.replies === 1 ? "" : "s"
            }}
         </p>
         <div ml-6 md:ml-8 mr-8 v-for="(comment, index) in comments" :key="index">
            <CommentCardContainer :comment="comment" />

            <div
               v-if="index < comments.length - 1"
               mt-6
               mb-6
               md:mt-8
               h-1px
               class="bg-#647196 opacity-10"
            ></div>
            <div v-else mb-6></div>
         </div>
      </div>
      <div bg-white mt-6>
         <div mx-8>
            <p pt-6 h3>Add Comment</p>
            <FeedbackInput
               ref="inp"
               v-model="newComment"
               mt-6
               type="textarea"
               rows="2"
               placeholder="Type your comment here"
            />
            <div mt-4 pb-6 flex items-center justify-between>
               <p>{{ charCount }} Characters left</p>
               <button @click="postIt()" btn btn1>Post Comment</button>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
   const store = inject("store")

   const feedbackItem = computed(() => {
      return store.feedbackItem
   })
   const { comments } = feedbackItem.value
   const inp = ref(null)
   const newComment = ref("")

   const charCount = computed(() => {
      return 250 - newComment.value.length
   })

   watch(
      () => charCount.value,
      (newVal) => {
         if (newVal < 250) {
            inp.value.isError = false
         }
      },
      { immediate: true }
   )

   const postIt = () => {
      if (charCount.value === 250) {
         inp.value.isError = true
      } else {
         comments.push({
            user: store.user,
            content: newComment.value,
         })
         feedbackItem.value.replies++
         if (store.sortById > 2) {
            store.sortData()
         }
      }
   }

   const goBack = () => {
      if (store.lastComponent === undefined) {
         store.isMain = true
         store.activeComponent = undefined
      } else {
         store.activeComponent = store.lastComponent
         store.lastComponent = undefined
      }
   }

   const editFeedback = () => {
      store.isMain = false
      store.isFeedbackAdd = false
      store.activeComponent = "FeedbackAddEdit"
   }
</script>

<style scoped>
   @media (min-width: 768px) {
      ._scroll {
         max-height: calc(100vh - 370px);
      }
   }
   @media (min-width: 1150px) {
      ._scroll {
         max-height: calc(100vh - 640px);
      }
   }
</style>
