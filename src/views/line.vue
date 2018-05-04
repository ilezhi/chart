<template>
  <div>
    <h1>line</h1>
    <div>
      <line-chart :width='width' :height='height' :data="data">
        <x-axis prop="time" />
        <y-axis />
        <rc-line prop="gdp" />
      </line-chart>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: 500,
      height: 300,
      data: [
        
      ]
    }
  },

  mounted() {
    console.log('gg')
    let i = 1000;
    let max = 1100;
    let data = []
    for (i; i < max; i++) {
      let time = i + ''
      let gdp = Math.floor(Math.random() * 1000)
      let count = Math.floor(Math.random() * 800)
      data.push({
        time,
        gdp
      })
    }
    this.data = data
    // setTimeout(() => {
      // this.data.push({time: 'ff', gdp: 2000, count: 7821})
      // this.data = [
      //   { time: '2017', gdp: 12, count: 33 },
      //   { time: '2018', gdp: 15, count: 40 }
      // ]
    // }, 3000)
  }
}
</script>

