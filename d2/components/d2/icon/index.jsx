import makeClassnames from 'classnames'
import { defineComponent, ref, unref, computed, watch, onMounted, nextTick, onBeforeUpdate } from 'vue'
import iconify from '@iconify/iconify'
import { clearElement } from 'd2/utils/dom.js'
import { useConfig } from 'd2/components/d2/config/use.js'
import { makeComponentName, makeComponentClassName } from 'd2/utils/special/d2-components/name.js'

const name = 'icon'

const componentName = makeComponentName(name)
const classname = makeComponentClassName(name)

export default defineComponent({
  name: componentName,
  props: {
    collection: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  setup (props) {
    const wrapper = ref(null)

    const { iconCollection } = useConfig()

    const collection = computed(() => props.collection || iconCollection)

    const iconName = computed(() => {
      // like collection:icon
      if (props.name.indexOf(':') > 0) return props.name
      // The icon name does not contain the icon collection name
      // Try to get it from another way
      return unref(collection) ? `${unref(collection)}:${props.name}` : props.name
    })

    async function load () {
      clearElement(unref(wrapper))
      await nextTick()
      const svg = iconify.renderSVG(unref(iconName), {})
      if (svg) {
        unref(wrapper).appendChild(svg)
      } else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = unref(iconName)
        unref(wrapper).appendChild(span)
      }
    }

    const classnames = computed(() => makeClassnames(classname, {}))

    onMounted(load)
    onBeforeUpdate(() => {
      wrapper.value = unll
    })
    watch(() => props.collection, load, { flush: 'post' })
    watch(() => props.icon, load, { flush: 'post' })

    return {
      wrapper,
      classnames
    }
  },
  render () {
    const {
      classnames
    } = this
    return (
      <span class={ classnames } ref="wrapper"/>
    )
  }
})