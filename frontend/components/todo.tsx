import fetch from 'node-fetch'
import React from 'react'
import { GetStaticProps } from 'next'

export interface ITodo {
  _id: String;
  details: String;
  isComplete: Boolean;
}

class Todo extends React.Component<ITodo> {
  render() {
    return (
      <div>
          <p>{ this.props.details }</p>
      </div>
    )
  }
}
export default Todo;
