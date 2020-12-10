<template>
  <v-btn fab fixed bottom right color="pink" dark @click.stop="toggle">
    <v-icon>{{ enabled ? "mdi-close" : "mdi-comment" }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { Target } from '..'

/** Element のCSSクエリ文字列を取得する */
function getElementQuery(element: Element): string {
  const strings: string[] = []
  for (let e: Element | null = element; e?.parentElement; e = e.parentElement) {
    const tag = e.localName
    const id = e.id ? `#${e.id}` : ''
    let nth = 1
    for (let sib = e.previousElementSibling; sib; sib = sib.previousElementSibling) {
      nth++
    }
    const nthChild = nth > 1 ? `:nth-child(${nth})` : ''
    strings.unshift(`${tag}${id}${nthChild}`)
  }
  return strings.join('>')
}

export default Vue.extend({
  name: 'Picker',
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
      console.log('picked', ev)
      ev.preventDefault()
      ev.stopPropagation()
      if (ev.target instanceof HTMLElement) {
        const selector = getElementQuery(ev.target)
        const target: Target = {
          selector,
          offsetX: ev.offsetX,
          offsetY: ev.offsetY,
        }
        this.$emit('input', target)
        this.disablePick()
      } else {
        console.log('ignore', ev.target)
      }
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
