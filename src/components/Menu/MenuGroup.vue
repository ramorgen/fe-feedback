<template>
   <div v-if="store.wWidth > 1149" mt-94px>
      <Header />
      <SuggestionType mt-6 />
      <RoadMapPreview mt-6 />
   </div>
   <div v-if="store.wWidth > 767 && store.wWidth < 1150" mt-56px flex mx-39px>
      <Header />
      <SuggestionType ml-10px />
      <RoadMapPreview ml-10px />
   </div>
   <div v-if="store.wWidth < 767">
      <Header />
   </div>
</template>

<script setup>
   const store = inject("store")
</script>

<style scoped></style>
