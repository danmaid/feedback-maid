<template>
  <div>
    <v-menu :close-on-content-click="false" offset-x>
      <template #activator="{ on }">
        <v-icon color="pink" v-on="on">mdi-comment</v-icon>
      </template>

      <FeedbackCard v-model="feedback"></FeedbackCard>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Feedback } from '..'
import Vue, { PropType } from 'vue'
import FeedbackCard from './FeedbackCard.vue'

export default Vue.extend({
  components: { FeedbackCard },
  name: 'FeedbackPin',
  props: {
    value: { type: Object as PropType<Feedback> }
  },
  data() {
    return {
      feedback: this.value
    }
  },
  watch: {
    feedback(v) { this.$emit('input', v) }
  },
  mounted() {
    console.log(this.value)
  }
})
</script>
