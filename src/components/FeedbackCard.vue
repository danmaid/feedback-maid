<template>
  <v-card min-width="300">
    <v-card-title>こめんと</v-card-title>
    <v-card-text v-for="comment of comments" :key="comment.id">{{ comment }}</v-card-text>
    <v-card-text>
      <v-textarea v-model="comment"></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!comment" :loading="loading" color="primary" @click="submit">送信</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Feedback } from '..'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    value: { type: Object as PropType<Feedback>, required: true }
  },
  data() {
    return {
      comments: this.value.comments || [],
      comment: '',
      loading: false
    }
  },
  methods: {
    submit() {
      const { comment } = this
      this.comments.push(comment)
      const payload = { ...this.value, comments: this.comments }
      this.loading = true
      console.log(JSON.stringify(payload))
      this.loading = false
      this.comment = ''
    }
  }
})
</script>
