import basic from '@/chart/mixins/basic'
import { line } from 'd3-shape'
import { scalePoint, scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
export default {
  name: 'x-axis',
  type: 'xaxis',
  mixins: [basic],

  props: {
    prop: String
  },

  computed: {
    data() {
      let { prop, Plane: { data }, i } = this
      let xData = data.map(item => item[prop])
      this.updateConfig('data', xData)
      return xData
    },

    i() {
      return this.$vnode.index
    },

    scale() {
      let { i, data, Plane: { grid } } = this
      let scale = scalePoint().domain(data).rangeRound([0, grid.width])
      this.updateConfig('scale', scale)
      return scale
    }
  },

  methods: {
    updateConfig(key, val) {
      this.setConfig('xaxis', key, val, this.i)
    },

    renderTicks() {
      let { scale, data, Plane: { grid } } = this
      let len = data.length
      if (!len) {
        return null
      }
      let width = grid.width
      let step = width / len
      let n = Math.ceil(60 / step)
      
      return data.map((item, i) => {
        if (i % n === 0) {
          let x = scale(item)
          return (
            <g transform={`translate(${x}, 0)`}>
              <line y1='6' stroke='#333' stroke-width='1.5' />
              <text y='20' x='-14' fill='#333'>{ item }</text>
            </g>
          )
        }
        return null
      })
    },

    renderAxisLine() {
      let width = this.Plane.grid.width

      return (
        <line x1={width} stroke='#333' storke-width='1.5' />
      )
    }
  },

  render() {
    let { height } = this.Plane.grid

    return (
      <g transform={`translate(0, ${height})`}>
        { this.renderAxisLine() }
        {this.renderTicks()}
      </g>
    )
  }
}