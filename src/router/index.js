import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import axios from 'axios'
import app from '@/app.js'
import LoginComp from '@/dashboard/login'
import HomeComp from '@/dashboard/home/index'
import HomeChildComp from '@/dashboard/home/home'
import HomeCheckComp from '@/dashboard/home/views/check/index'
import ProductCategory from '@/dashboard/home/views/product/index'
import ProductCheck from '@/dashboard/home/views/productCheck/index'
import ProductExchange from '@/dashboard/home/views/productExchange/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginComp,
      beforeEnter: (to, from, next) => {
        if (!app.currentUser) {
          if (app.requireLogin) return next()
          axios.post('/users/currentUser').then((result) => {
            if (!result.data.ok) return next()
            app.currentUser = result.data.data
            next('/')
          }).catch(() => next())
        } else {
          next('/')
        }
      }
    }, {
      path: '/',
      component: HomeComp,
      beforeEnter: (to, from, next) => {
        if (!app.currentUser) {
          axios.post('/users/currentUser').then((result) => {
            if (!result.data.ok) {
              app.requireLogin = true
              return next('/login')
            }
            app.currentUser = result.data.data
            next()
          }).catch(() => {
            app.requireLogin = true
            next('/login')
          })
        } else next()
      },
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: HomeChildComp
        },
        {
          path: 'check',
          component: HomeCheckComp
        },
        {
          path: 'product',
          component: {template: '<router-view></router-view>'},
          children: [
            {
              path: 'category',
              name: 'productCategory',
              component: ProductCategory
            },
            {
              path: 'check',
              name: 'productCheck',
              component: ProductCheck
            },
            {
              path: 'exchange',
              name: 'productExchange',
              component: ProductExchange
            }
          ]
        }
      ]
    }
  ]
  // mode: 'history'
})
