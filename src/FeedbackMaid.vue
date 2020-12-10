<template>
  <div>
    <Picker @input="picked"></Picker>
    <FeedbackOverlay v-model="feedbacks"></FeedbackOverlay>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Picker from './components/Picker.vue'
import FeedbackOverlay from './components/FeedbackOverlay.vue'
import { Feedback, Target } from '.'

export default Vue.extend({
  name: 'FeedbackMaid',
  components: { Picker, FeedbackOverlay },
  data(): { feedbacks: Feedback[] } {
    return {
      feedbacks: []
    }
  },
  methods: {
    picked(target: Target) {
      console.log('picked', target)
      this.feedbacks.push({ url: location.href, target })
    }
  }
})
</script>
