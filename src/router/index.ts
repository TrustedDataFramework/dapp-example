import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', // 首页
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/donors', //捐赠人
      name: 'donors',
      component: () => import('@/views/Donors'),
      meta: {
        title: '会签合同'
      }
    },
    {
      path: '/cross', //红十字会
      name: 'cross',
      component: () => import('@/views/Cross'),
      meta: {
        title: '查询信息'
      }
    },
    {
      path: '/beneficiary-select', //查询
      name: 'beneficiary-select',
      component: () => import('@/views/BeneficiarySelect'),
      meta: {
        title: '查询信息'
      }
    },
    {
      path: '/success', // 成功提示
      name: 'success',
      component: () => import('@/views/Success')
    },
    {
      path: '/select-donors',
      name: 'select-donors',
      component: () => import('@/views/SelectDonors')
    }
  ]
})

export { router }
