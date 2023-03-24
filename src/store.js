import { reactive } from "vue"
import { useWindowSize } from "@vueuse/core"

const { width, height } = useWindowSize()

const store = reactive({
   version: "1.0.00",
   wWidth: width,
   wHeight: height,
   data: undefined,
   isMain: true,
   isFeedbackAdd: undefined,
   lastComponent: undefined,
   activeComponent: undefined,
   activeSuggestionFilter: "All",
   feedbackItem: undefined,
   sortById: 1,
   sortByData: [
      { id: 1, option: "Most Upvotes" },
      { id: 2, option: "Least Upvotes" },
      { id: 3, option: "Most Comments" },
      { id: 4, option: "Least Comments" },
   ],
   user: undefined,
   roadMap: {
      planned: [],
      inProgress: [],
      live: [],
   },

   setData: function (d) {
      this.data = toRaw(d)
      this.user = this.data.currentUser
      this.sortData()
      this.roadMap.planned = this.data.productRequests.filter((item) => {
         return item.status === "Planned"
      })
      this.roadMap.inProgress = this.data.productRequests.filter(
         (item) => item.status === "In-progress"
      )
      this.roadMap.live = this.data.productRequests.filter((item) => item.status === "Live")
   },

   getData: function () {
      if (this.activeSuggestionFilter === "All") {
         return this.data.productRequests
      } else {
         return this.data.productRequests.filter((item) => {
            return item.category === this.activeSuggestionFilter
         })
      }
   },

   addFeedback: function (item) {
      this.data.productRequests.push(item)
      this.sortData()
   },

   saveFeedback: function (item) {
      this.data.productRequests.push(item)
      this.sortData()
   },

   deleteFeedback: function (id) {
      const index = this.data.productRequests.findIndex((item) => item.id === id)
      if (index > -1) {
         this.data.productRequests.splice(index, 1)
      }
   },

   sortData: function () {
      if (this.sortById === 1) {
         this.data.productRequests.sort((a, b) => b.upvotes - a.upvotes)
      } else if (this.sortById === 2) {
         this.data.productRequests.sort((a, b) => a.upvotes - b.upvotes)
      } else if (this.sortById === 3) {
         this.data.productRequests.sort((a, b) => b.replies - a.replies)
      } else if (this.sortById === 4) {
         this.data.productRequests.sort((a, b) => a.replies - b.replies)
      }
   },
})
export default store
