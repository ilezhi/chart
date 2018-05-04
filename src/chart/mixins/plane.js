export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },

    width: {
      type: [Number, String],
      default: 500
    },

    height: {
      type: [Number, String],
      default: 300
    },

    padding: {
      type: Array,
      default: () => [50, 50, 50, 50]
    }
  },

  computed: {
    grid() {
      let { width, height, padding } = this
      let [ top, right, bottom, left ] = padding
      
      let x1 = width - right
      let y1 = height - bottom

      return {
        x0: left,
        y0: top,
        width: x1 - left,
        height: y1 - top,
        x1,
        y1
      }
    }
  },

  provide() {
    return {
      Plane: this,
      getConfig: () => this.config,
      setConfig: (obj, key, val, i) => {
        if (i === undefined) {
          this.config[obj][key] = val
        } else {
          this.config[obj][i][key] = val
        }
      }
    }
  },

  data() {
    return {
      props: null,
      config: {}
    }
  }
}