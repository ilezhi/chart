import LineChart from './linechart'


const components = [
  LineChart
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.use(component)
  })
}

export default {
  install,
  LineChart
}
