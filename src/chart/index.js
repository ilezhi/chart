import LineChart from './linechart'
import XAxis from './xaxis'
import YAxis from './yaxis'
import Line from './line'


const components = [
  LineChart,
  XAxis,
  YAxis,
  Line
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.use(component)
  })
}

export default {
  install,
  LineChart,
  XAxis,
  YAxis,
  Line
}
