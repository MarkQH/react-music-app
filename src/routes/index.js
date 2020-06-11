import React, { Suspense, lazy } from 'react';
import { Redirect } from "react-router-dom";
import Home from '@/pages/Home';
const Recommend = lazy (() => import ("@/pages/Recommend/"));
const Singers = lazy (() => import ("@/pages/Singers/"));
const Rank = lazy (() => import ("@/pages/Rank/"));
const Album = lazy (() => import ("@/pages/Album/"));
const Singer = lazy (() => import ("@/pages/Singer/"));
const Search = lazy (() => import ("@/pages/Search/"));

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => {
          <Redirect to={'/recommend'} />
        }
      },
      {
        path: '/recommend',
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: '/singers',
        component: SuspenseComponent(Singers),
        routes: [
          {
            path: '/singers/:id',
            component: SuspenseComponent(Singer)
          }
        ]
      },
      {
        path: '/rank',
        component: SuspenseComponent(Rank),
        routes: [
          {
            path: '/rank/:id',
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: '/search',
        exact: true,
        key: 'search',
        component: SuspenseComponent(Search)
      }
    ]
  }
]
