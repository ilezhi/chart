import basic from '@/chart/mixins/basic'
import { line } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { max, extent, ticks, tickStep, range } from 'd3-array'  

export default {
  name: 'y-axis',
  type: 'yaxis',
  mixins: [basic],

  props: {
    min: {
      type: [String, Number],
      default: 0
    },

    max: [String, Number]
  },

  computed: {
    i() {
      return this.$vnode.index
    },

    scale() {
      let { low, high, Plane: { grid } } = this
      let scale = scaleLinear()
        .domain([low, high])
        .rangeRound([grid.height, 0])
      
      this.updateConfig('scale', scale)
      return scale
    },

    high() {
      let { max, minMax } = this
      let high =  max || minMax[1]
      return high * 1.2
    },
    
    low() {
      let { min, minMax } = this
      return min === 'auto' ? minMax[0] : min
    },

    minMax() {
      let { Plane: { props, data } } = this

      let arr = props.map(key => {
        return data.map(item => item[key])
      })

      return extent([].concat(...arr))
    }
  },


  methods: {
    updateConfig(key, val) {
      this.setConfig('yaxis', key, val, this.i)
    },

    renderAxisLine() {
      let height = this.Plane.grid.height
      return (
        <line y1={height} stroke='#333' stroke-widht='1.5' />
      )
    },

    renderTicks() {
      let { low, high, scale } = this
      let labels = ticks(low, high, 5)
  
      return labels.map(val => {
        let y = scale(val)
        return (
          <g transform={`translate(0, ${y})`}>
            <line x2='-6' stroke='#333' stroke-width='1.5' />
            <text text-anchor='end' dx='-10' dy='5'>{ val }</text>
          </g>
        )
      })
    }
  },

  render() {
    return (
      <g class='y axis'>
        { this.renderAxisLine() }
        { this.renderTicks() }
      </g>
    )
  }
}