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
      type: [Array, String],
      default: () => [50, 50, 50, 50]
    },

    autoresize: {
      type: Boolean,
      default: false
    },

    type: String
  }
}