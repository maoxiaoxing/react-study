import Position from '../pages/demo/position'
import Rule from '../pages/demo/rule'

import Hooks from '../pages/hooks'
import UseState from '../pages/hooks/useState.jsx'
import UseReducer from  '../pages/hooks/useReducer'
import UseContext from  '../pages/hooks/useContext'
import UseEffect from  '../pages/hooks/useEffect'
import UseMemo from  '../pages/hooks/useMemo'
import Memo from  '../pages/hooks/memo'
import UseCallback from  '../pages/hooks/useCallback'
import UseRef from  '../pages/hooks/useRef'

import Principle  from '../pages/hooks-principle'
import State  from '../pages/hooks-principle/state'


const routes = [
  {
    path: '/demo',
    name: 'Demo',
    title: 'Demo',
    descriptions: 'Demo',
    children: [
      {
        path: '/demo/position',
        name: 'Position',
        title: 'Position',
        descriptions: 'Position',
        component: Position,
      },
      {
        path: '/demo/rule',
        name: 'Rule',
        title: 'Rule',
        descriptions: 'Rule',
        component: Rule,
      },
    ],
  },
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
      {
        path: '/hooks/useMemo',
        name: 'UseMemo',
        title: 'UseMemo',
        descriptions: 'UseMemo',
        component: UseMemo,
      },
      {
        path: '/hooks/memo',
        name: 'Memo',
        title: 'Memo',
        descriptions: 'Memo',
        component: Memo,
      },
      {
        path: '/hooks/useCallback',
        name: 'UseCallback',
        title: 'UseCallback',
        descriptions: 'UseCallback',
        component: UseCallback,
      },
      {
        path: '/hooks/useRef',
        name: 'UseRef',
        title: 'UseRef',
        descriptions: 'UseRef',
        component: UseRef,
      },
    ],
  },
  {
    path: '/hooks-principle',
    name: 'HooksPrinciple',
    title: 'HooksPrinciple',
    descriptions: 'HooksPrinciple',
    children: [
      {
        path: '/hooks-principle/principle',
        name: 'Principle',
        title: 'Principle',
        descriptions: 'Principle',
        component: Principle,
      },
      {
        path: '/hooks-principle/State',
        name: 'State',
        title: 'State',
        descriptions: 'State',
        component: State,
      },
    ],
  },
]

export default routes
