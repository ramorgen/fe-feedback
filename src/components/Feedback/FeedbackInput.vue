<template>
   <div class="relative">
      <input
         v-if="attrs.type !== 'textarea'"
         :id="id"
         class="_input h-12"
         :class="_class"
         :value="modelValue"
         :placeholder="attrs.placeholder"
         :type="attrs.type"
         @input="inp"
      />
      <textarea
         v-if="attrs.type === 'textarea'"
         :id="id"
         class="_input"
         :class="_class"
         :rows="attrs.rows"
         :value="modelValue"
         :placeholder="attrs.placeholder"
         :type="attrs.type"
         @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <div v-if="isError" class="absolute text-14px text-#D73737 left">
         <p>{{ errorText() }}</p>
      </div>
   </div>
</template>

<script setup>
   import { useAttrs } from "vue"

   const emit = defineEmits(["update:modelValue"])
   const attrs = useAttrs()
   defineProps(["modelValue"])

   const id = parseInt(1e6 * Math.random())
   const isError = ref(false)

   const inp = (e) => {
      if (e.target.value !== "") {
         isError.value = false
      }
      console.log(e.target.value)
      emit("update:modelValue", e.target.value)
   }

   const errorText = () => {
      return "Can't be empty"
   }

   const _class = computed(() => {
      if (isError.value) {
         return "! border-#D73737 border-2"
      } else {
         return ""
      }
   })

   defineExpose({ isError }) //necessary: the flag can set by any parent components
</script>

<style scoped>
   ._input {
      /* border: transparent; */
      border-radius: 5px;
      background-color: #f7f8fd;
      width: 100%;
      padding: 16px 24px;
      color: #3a4374;
      font-size: 15px;
      line-height: 22px;
   }

   input:active,
   input:focus {
      outline-style: solid;
      outline-color: #4661e6;
      opacity: 1;
   }

   ::placeholder {
      color: #8c92b3;
   }
</style>
