<template>
  <div>
    <Picker @input="picked"></Picker>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Picker, { Target } from './components/Picker.vue'
import Comment from './components/Comment.vue'

type Feedback = {
  target: Target;
  comment?: string;
}

export default Vue.extend({
  components: { Picker },
  computed: {
    feedbacks(): Feedback[] { return [] }
  },
  mounted() {
    console.log('FeedbackMaid')
  },
  methods: {
    picked(target: Target) {
      console.log('picked')
      console.log(target)
      this.feedbacks.push({ target })
    }
  }
})
</script>
