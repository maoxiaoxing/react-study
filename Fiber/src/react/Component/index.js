import { scheduleUpdate } from '../reconciliation'

export class Component {
  constructor(props) {
    this.props = props
  }

  setState(partialState) {
    scheduleUpdate(this, partialState)
  }
}
