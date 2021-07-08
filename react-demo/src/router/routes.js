import Hooks from '../pages/hooks'
import UseState from '../pages/hooks/useState.jsx'
import UseReducer from  '../pages/hooks/useReducer'
import UseContext from  '../pages/hooks/useContext'
import UseEffect from  '../pages/hooks/useEffect'

const routes = [
  {
    path: '/hooks',
    name: 'Hooks',
    title: 'Hooks',
    descriptions: 'Hooks',
    children: [
      {
        path: '/hooks/hook',
        name: 'Hook',
        title: 'Hook',
        descriptions: 'Hooks',
        component: Hooks,
      },
      {
        path: '/hooks/useState',
        name: 'UseState',
        title: 'UseState',
        descriptions: 'UseState',
        component: UseState,
      },
      {
        path: '/hooks/useReducer',
        name: 'UseReducer',
        title: 'UseReducer',
        descriptions: 'UseReducer',
        component: UseReducer,
      },
      {
        path: '/hooks/useContext',
        name: 'UseContext',
        title: 'UseContext',
        descriptions: 'UseContext',
        component: UseContext,
      },
      {
        path: '/hooks/useEffect',
        name: 'UseEffect',
        title: 'UseEffect',
        descriptions: 'UseEffect',
        component: UseEffect,
      },
    ],
  }
]

export default routes
