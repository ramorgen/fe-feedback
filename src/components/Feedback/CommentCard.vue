<template>
   <article>
      <div flex justify-between>
         <div flex>
            <img
               w-10
               h-10
               rounded-full
               :src="comment.user.image"
               :alt="comment.user.name"
            />
            <div ml-4 md:ml-8>
               <p h4>{{ comment.user.name }}</p>
               <p text-14px class="text-#647196">
                  @{{ comment.user.username }}
               </p>
            </div>
         </div>
         <p @click="reply()" body3 cursor-pointer class="text-#4661E6">Reply</p>
      </div>

      <p
         ml-0
         md:ml-18
         mt-4
         md:body2
         text-13px
         md:text-15px
         class="text-#647196"
      >
         <span
            class="text-13px md:text-15px text-#AD1FEA font-bold pr-2"
            v-if="comment.replyingTo"
            >@{{ comment.replyingTo }} </span
         >{{ comment.content }}
      </p>
      <div v-if="showReply" mt-6 flex items-start justify-between>
         <FeedbackInput
            class="w-8/12"
            ml-0
            md:ml-18
            ref="inp"
            v-model="newReply"
            type="textarea"
            rows="2"
            placeholder="Type your reply here"
         />
         <button @click="postIt()" btn btn1>Post Reply</button>
      </div>
   </article>
</template>

<script setup>
   const store = inject("store")
   const props = defineProps({
      comment: Object,
      parent: Object,
   })

   const showReply = ref(false)
   const newReply = ref("")

   const reply = () => {
      showReply.value = true
   }

   const postIt = () => {
      if (props.parent === undefined) {
         props.comment.replies = [
            {
               user: store.user,
               content: newReply.value,
               replyingTo: props.comment.user.username,
            },
         ]
      } else {
         props.parent.replies.push({
            user: store.user,
            content: newReply.value,
            replyingTo: props.comment.user.username,
         })
      }
      showReply.value = false
      store.feedbackItem.replies++
   }
</script>

<style scoped></style>
