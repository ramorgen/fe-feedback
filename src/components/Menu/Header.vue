<template>
   <div relative :class="_class">
      <picture>
         <source srcset="/suggestions/tablet/background-header.png" media="(min-width: 768px)" />
         <source srcset="/suggestions/desktop/background-header.png" media="(min-width: 1000px)" />
         <img
            src="/suggestions/mobile/background-header.png"
            alt="Placeholder"
            class="w-full h-full object-cover"
            :class="{ 'rounded-10px': store.wWidth > 767 }"
         />
      </picture>
      <div v-if="store.wWidth > 767" class="absolute top-103px lg:top-62px left-24px">
         <p h2 text-white>Frontend Mentor</p>
         <p body2 text-white opacity-75>Feedback board</p>
      </div>
      <!-- Mobile -->
      <div v-else flex flex-row justify-between>
         <div absolute w-115px h-41px top-16px left-24px>
            <p h4 text-white>Frontend Mentor</p>
            <p text-white opacity-75 text-13px>Feedback Board</p>
         </div>
         <button v-if="!showMenu" @click="showMenu = true" absolute right-24px top-27px>
            <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
               <g fill="#FFF" fill-rule="evenodd">
                  <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
               </g>
            </svg>
         </button>
         <button v-if="showMenu" @click="showMenu = false" absolute right-24px top-27px>
            <svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z"
                  fill="#FFF"
                  fill-rule="evenodd"
               />
            </svg>
         </button>
      </div>
   </div>
   <Teleport to="body">
      <Transition>
         <div
            v-if="showMenu"
            absolute
            w-screen
            top-72px
            h-screen
            z-100
            flex
            justify-end
            class="_modal"
         >
            <div relative h-full pt-6 class="bg-#F7F8FD">
               <SuggestionType mx-6 />
               <RoadMapPreview mt-6 mx-6 />
            </div>
         </div>
      </Transition>
   </Teleport>
</template>

<script setup>
   const store = inject("store")
   const _class =
      store.wWidth < 768 ? "h-72px" : store.wWidth < 1150 ? "w-223px h-178px" : "w-255px h-137px"

   const showMenu = ref(false)
</script>

<style scoped>
   ._modal {
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s ease;
   }
</style>
