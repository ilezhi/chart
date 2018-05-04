import { line } from 'd3-shape'
import basic from '@/chart/mixins/basic'
export default {
  name: 'rc-line',
  type: 'series',
  mixins: [basic],


  props: {
    prop: String,
    xAxisIndex: {
      type: Number,
      default: 0,
    },
    yAxisIndex: {
      type: Number,
      default: 0
    }
  },

  computed: {
    config() {
      return this.getConfig()
    },

    xScale() {
      return this.config.xaxis[this.xAxisIndex].scale
    },

    yScale() {
      return this.config.yaxis[this.yAxisIndex].scale
    },

    columns() {
      let { prop } = this
      return this.Plane.data.map(item => item[prop])
    },

    rows() {
      return this.Plane.config.xaxis[this.xAxisIndex].data
    }
  },
  
  render() {
    let { rows, columns, xScale, yScale } = this
    let points = columns.map((item, i) => {
      return [xScale(rows[i]), yScale(item)]
    });

    let genLine = line()
    let linePath = genLine(points)

    return (
      <path d={linePath} fill='none' stroke='#333' stroke-width='1.5' />
    )
  }
}