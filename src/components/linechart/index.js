import LineChart from './src/linechart'

LineChart.install = function(Vue) {
  Vue.component(LineChart.name, LineChart)
}

export default LineChart