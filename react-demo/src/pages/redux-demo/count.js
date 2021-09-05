import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as couterActions from '../../store/actions/count'

const Counter = ({count, increment, decrement, increment_async}) => {

  return (
    <div>
      <button onClick={() => increment(20)}>+</button>
      <button onClick={() => increment_async(20)}>异步+</button>
      <span>{count}</span>
      <button onClick={() => decrement(5)}>-</button>
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.counter.count
});

const mapDispatchToProps = dispatch => bindActionCreators(couterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
