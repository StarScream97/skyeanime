import Vue from 'vue'
import Router from 'vue-router'
import searchAnime from '@/components/searchAnime'
import watchAnime from '@/components/watchAnime'
import recentAnime from '@/components/recentAnime'
import trendingAnime from '@/components/trendingAnime'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/search/:name',
      name: 'searchAnime',
      component: searchAnime
    }, {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/watch/:slug/:episode',
      name: 'watchAnime',
      component: watchAnime
    },
    {
      path: '/recent',
      name: 'recentAnime',
      component: recentAnime
    },
    {
      path: '/trending',
      name: 'trendingAnime',
      component: trendingAnime
    }

  ],
  mode: "history"
})
