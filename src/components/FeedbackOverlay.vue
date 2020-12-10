<template>
  <div style="z-index: 9999; position: relative">
    <template v-for="(item, i) of items">
      <FeedbackPin :key="i" v-model="item.feedback" :style="item.style" style="position: absolute"></FeedbackPin>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import FeedbackPin from './FeedbackPin.vue'
import { Feedback } from '..'

/** Element の絶対位置を取得する */
function getElementOffset(element: HTMLElement): { top: number; left: number } {
  const offset = { top: 0, left: 0 }
  for (let e = element; e.offsetParent; e = e.offsetParent as HTMLElement) {
    offset.top += e.offsetTop
    offset.left += e.offsetLeft
  }
  return offset
}

export default Vue.extend({
  name: 'FeedbackOverlay',
  components: { FeedbackPin },
  props: {
    value: { type: Array as PropType<Feedback[]> }
  },
  computed: {
    items(): { style: { top: string; left: string }; feedback: Feedback }[] {
      return this.value
        .map(v => ({ ...v, element: document.querySelector(v.target.selector) }))
        .filter(v => v.element) // 画面上に存在するものに限定
        .map(v => {
          console.log('plot', v)
          const offset = getElementOffset(v.element as HTMLElement)
          return {
            style: {
              top: (offset.top + v.target.offsetY) + 'px',
              left: (offset.left + v.target.offsetX) + 'px'
            },
            feedback: v
          }
        })
    }
  }
})
</script>
