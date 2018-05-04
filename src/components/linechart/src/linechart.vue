<template>
  <div>
    <svg :width="width" :height="height" ref="svg" style="background:#eee">
      <g>
        <circle></circle>
      </g>
    </svg>
    <div class="apple"></div>
  </div>
</template>
<script>
import 'd3-transition'
import { select, selectAll } from 'd3-selection'
import { scalePoint, scaleBand, scaleLinear, scaleTime } from 'd3-scale'
import { extent } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import { line } from 'd3-shape'
export default {
  name: 'line-chart',

  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    },
    grid: {
      type: Object,
      default: () => {
        return {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        }
      }
    },

    xaxis: {
      type: Object,
      default: () => {
        return {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      }
    },

    yaxis: {
      type: Object,
      default: () => {
        return {
          min: 0,
          max: 1500
        }
      }
    },

    series: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      $svg: null,
      $grid: null,
      xScale: null,
      yScale: null,
      $xaxis: null
    }
  },

  computed: {
    pane() {
      let { width, height, grid } = this
      let { top, right, bottom, left } = grid

      return {
        x0: left,
        y0: top,
        x1: width - right,
        y1: height - bottom,
        width: width - left - right,
        height: height - top - bottom
      }
    }
  },

  watch: {
    'xaxis.data': function(val) {
      let xScale = this.xScale
      xScale.domain(val)
      this.$xaxis.transition().duration(300).call(axisBottom(xScale))
    }
  },

  mounted() {
    this.$svg = select('svg')
    this.renderGrid()
    this.renderXaxis()
    this.renderYaxis()
    this.renderLine()

  },

  methods: {
    renderGrid() {
      let { top, left } = this.grid
      this.$grid = this.$svg.append('g').attr('transform', `translate(${left}, ${top})`)
    },

    renderXaxis() {
      let { x0, y0, x1, y1, width, height } = this.pane
      let { type, data } = this.xaxis
      let xScale = scalePoint().rangeRound([0, width]).domain(data)
      this.xScale = xScale
      this.$xaxis = this.$grid.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0, ${height})`)
                .call(axisBottom(xScale))

    },

    renderYaxis() {
      let { x0, y0, x1, y1, width, height } = this.pane
      let { min, max } = this.yaxis
      let yScale = scaleLinear().rangeRound([height, 0]).domain([min, max])
      this.yScale = yScale
      this.$grid.append('g')
                .call(axisLeft(yScale))
    },

    renderLine() {
      let series = [820, 932, 901, 934, 1290, 1330, 1320]
      let { xScale, yScale, xaxis: { data } } = this
      let points = series.map((item, i) => {
        return [
          xScale(data[i]),
          yScale(item)
        ]
      });

      let linePath = line()

      this.$grid.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', linePath(points))
    }
  }
}
</script>

