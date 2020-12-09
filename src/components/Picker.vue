<template>
  <v-btn fab fixed bottom right color="pink" dark @click.stop="toggle">
    <v-icon>{{ enabled ? "mdi-close" : "mdi-comment" }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export type Target = {
  offsetX: number;
  offsetY: number;
  target: Element;
}

export default Vue.extend({
  data() {
    return {
      enabled: false
    }
  },
  watch: {
    enabled(v) {
      v ? this.enablePick() : this.disablePick()
    }
  },
  methods: {
    toggle() {
      this.enabled = !this.enabled
    },
    enablePick() {
      this.enabled = true
      document.body.addEventListener('click', this.pick)
      document.body.classList.add('pick-cursor')
    },
    disablePick() {
      this.enabled = false
      document.body.removeEventListener('click', this.pick)
      document.body.classList.remove('pick-cursor')
    },
    pick(ev: MouseEvent) {
      ev.preventDefault()
      ev.stopPropagation()
      const target: Target = {
        offsetX: ev.offsetX,
        offsetY: ev.offsetY,
        target: ev.target as Element
      }
      this.$emit('input', target)
      this.disablePick()
      return false
    }
  }
})
</script>

<style>
.pick-cursor {
  cursor: pointer !important;
}
</style>
