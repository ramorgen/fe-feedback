<template>
   <section relative pb-6>
      <txtGoBack absolute top-34px sml-6 @click="cancel()" />
      <div relative mt-108px md:mt-144px lg:mt-152px w-327px md:w-540px bg-white rounded-10px>
         <div absolute left-42px :class="{ '-top-28px': isAdd, '-top-20px': !isAdd }">
            <svg v-if="isAdd" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <radialGradient
                     cx="103.9%"
                     cy="-10.387%"
                     fx="103.9%"
                     fy="-10.387%"
                     r="166.816%"
                     id="a"
                  >
                     <stop stop-color="#E84D70" offset="0%" />
                     <stop stop-color="#A337F6" offset="53.089%" />
                     <stop stop-color="#28A7ED" offset="100%" />
                  </radialGradient>
               </defs>
               <g fill="none" fill-rule="evenodd">
                  <circle fill="url(#a)" cx="28" cy="28" r="28" />
                  <path
                     fill="#FFF"
                     fill-rule="nonzero"
                     d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
                  />
               </g>
            </svg>
            <svg v-else width="40" height="40" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <radialGradient
                     cx="103.9%"
                     cy="-10.387%"
                     fx="103.9%"
                     fy="-10.387%"
                     r="166.816%"
                     id="a"
                  >
                     <stop stop-color="#E84D70" offset="0%" />
                     <stop stop-color="#A337F6" offset="53.089%" />
                     <stop stop-color="#28A7ED" offset="100%" />
                  </radialGradient>
               </defs>
               <g fill="none" fill-rule="evenodd">
                  <circle fill="url(#a)" cx="20" cy="20" r="20" />
                  <path
                     d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                     fill="#FFF"
                     fill-rule="nonzero"
                  />
               </g>
            </svg>
         </div>
         <div mx-6 md:mx-42px>
            <p v-if="isAdd" h1 class="text-#3A4374 pt-52px">Create New Feedback</p>
            <p v-if="!isAdd" h1 class="text-#3A4374 pt-52px">
               Editing '{{ store.feedbackItem.title }}'
            </p>
            <p h4 mt-6 md:mt-10 class="text-#647196">Feedback Title</p>
            <p class="text-#647196 text-14px">Add a short, descriptive headline</p>
            <FeedbackInput v-model="fbRecord.title" mt-4 type="text" />
            <!-- DropDown Category -->
            <FeedbackCategoryStatus
               :ddItems="categories"
               :fbRecord="fbRecord"
               :isAdd="isAdd"
               memberName="category"
            >
               Category
               <template #title2>Choose a category for your feedback</template>
            </FeedbackCategoryStatus>
            <!-- DropDown Status -->
            <FeedbackCategoryStatus
               v-if="!isAdd"
               :ddItems="status"
               :fbRecord="fbRecord"
               :isAdd="isAdd"
               memberName="status"
            >
               Update Status
               <template #title2>Change feedback state</template>
            </FeedbackCategoryStatus>

            <p h4 mt-6 md:mt-10 class="text-#647196">Feedback Detail</p>
            <p class="text-#647196 text-14px">
               Include any specific comments on what should be improved, added, etc.
            </p>
            <FeedbackInput v-model="fbRecord.description" mt-4 type="textarea" rows="4" />

            <div
               mt-10
               md:mt-8
               pb-6
               md:pb-10
               :class="{ 'flex flex-col-reverse md:flex-row md:justify-between': !isAdd }"
            >
               <button
                  v-if="!isAdd"
                  @click="deleteFeedback()"
                  mt-4
                  md:mt-0
                  w-full
                  md:w-auto
                  btn
                  btn_red
               >
                  Delete
               </button>
               <div flex flex-col-reverse md:flex-row md:justify-end>
                  <button @click="cancel()" btn btn_dark>Cancel</button>
                  <button @click="add()" mb-4 md:mb-0 md:ml-4 btn btn1>
                     {{ isAdd ? "Add Feedback" : "Save Changes" }}
                  </button>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
   const store = inject("store")

   const isAdd = computed(() => {
      return store.isFeedbackAdd
   })

   let fbRecord
   if (isAdd.value) {
      fbRecord = computed(() => {
         return {
            id: parseInt(1e7 * Math.random()),
            title: "",
            category: "Feature",
            upvotes: 0,
            replies: 0,
            status: "Suggestion",
            description: "",
            comments: [],
         }
      })
   } else {
      fbRecord = store.feedbackItem
   }

   const categories = [
      { id: 1, option: "Feature" },
      { id: 2, option: "UI" },
      { id: 3, option: "UX" },
      { id: 4, option: "Enhancement" },
      { id: 5, option: "Bug" },
   ]

   const status = [
      { id: 1, option: "Suggestion" },
      { id: 2, option: "Planned" },
      { id: 3, option: "In-progress" },
      { id: 4, option: "Live" },
   ]
   const cancel = () => {
      if (isAdd.value) {
         if (store.lastComponent === undefined) {
            store.isMain = true
            store.activeComponent = undefined
         } else {
            store.activeComponent = store.lastComponent
            store.lastComponent = undefined
         }
      } else {
         store.isMain = false
         store.activeComponent = "FeedbackDetail"
      }
   }
   const add = () => {
      if (isAdd.value) {
         store.addFeedback(fbRecord.value)
      }
      cancel()
   }
   const deleteFeedback = () => {
      store.deleteFeedback(fbRecord.id)
      store.isMain = true
      store.activeComponent = undefined
   }
</script>

<style scoped></style>
