export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/workplace' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        path: '/total',
        name: 'total',
        icon: 'area-chart',
        routes: [
          {
            path: '/total/personal',
            name: 'doctor',
            component: './TotalReport/Personal',
          },
          {
            path: '/total/department',
            name: 'department',
            component: './TotalReport/Department',
          },
          {
            path: '/total/hospital',
            name: 'hospital',
            component: './TotalReport/Hospital',
          },
        ],
      },
      {
        path: '/trend',
        name: 'trend',
        icon: 'line-chart',
        routes: [
          {
            path: '/trend/personal',
            name: 'doctor',
            component: './TrendReport/Personal',
          },
          {
            path: '/trend/department',
            name: 'department',
            component: './TrendReport/Department',
          },
          {
            path: '/trend/hospital',
            name: 'hospital',
            component: './TrendReport/Hospital',
          },
        ],
      },
      {
        path: '/interaction',
        name: 'interaction',
        icon: 'team',
        routes: [
          {
            path: '/interaction/chatroom',
            name: 'chatroom',
            component: './Interaction/Chatroom',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
];
