<template>
   <CommentCard :comment="comment" />
   <div v-if="comment.replies">
      <CommentCard
         mt-8
         ml-5
         md:ml-11
         :comment="reply"
         :parent="comment"
         v-for="(reply, index) in comment.replies"
         :key="index"
      />
   </div>
</template>

<script setup>
   const store = inject("store")
   const props = defineProps({
      comment: Object,
   })
</script>

<style scoped></style>
