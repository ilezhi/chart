import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import Line from '@/views/line'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          path: 'line',
          name: 'line',
          component: Line
        }
      ]
    }
  ]
})
