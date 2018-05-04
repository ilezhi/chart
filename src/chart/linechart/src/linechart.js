import plane from '@/chart/mixins/plane'
export default {
  name: 'line-chart',

  mixins: [plane],

  render() {
    let { width, height } = this
    let slots = this.$slots.default || []

    let config = {}
    let props = []
    let $charts = []
    let $xaxis = []
    let $yaxis = []
    let $widgets = []
    let $others = []

    slots.forEach(slot => {
      let options = slot.componentOptions
      // 如果插槽内为文本元素
      if (!options) {
        return
      }

      let sealed = options.Ctor.sealedOptions

      // 用户通过组件传递的数据
      let { propsData } = options
      // 组件中的type属性
      let type = sealed.type

      if (config[type]) {
        config[type].push(propsData)
      } else {
        config[type] = [propsData]
      }

      switch (type) {
        case 'series':
          let { prop } = propsData
          // 折线上的prop属性, 对应data中的key
          slot.index = $charts.length
          props.push(prop)
          $charts.push(slot)
          break

        case 'xaxis':
          slot.index = $xaxis.length
          $xaxis.push(slot)
          break

        case 'yaxis':
          slot.index = $yaxis.length
          $yaxis.push(slot)
          break

        case 'tooltip':
        case 'legend':
          $widgets.push(slot)
          config[type] = propsData
          break

        default:
          $others.push(slot)
          config[type] = propsData
          break
      }
    })

    this.props = props
    this.config = config
    
    let { x0, y0 } = this.grid
    return (
      <div>
        <svg style='background: #eee' widht={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(${x0}, ${y0})`}>
            { $others.concat($xaxis, $yaxis, $charts) }
          </g>
        </svg>
        { $widgets }
      </div>
    )
  } 
}
