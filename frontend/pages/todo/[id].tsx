import fetch from 'node-fetch'
import React from 'react'
import { GetStaticProps } from 'next'
import Todo from '../../components/todo'
import Router from 'next/router';

export interface ITodo {
  _id: String;
  details: String;
  isComplete: Boolean;
}

class Item extends React.Component<ITodo> {
  handleSubmit = e => {
    e.preventDefault();
    fetch('http://192.168.0.15:5000/api/v1/todo/' + this.props._id + '/complete', {
      method: 'post'
    })
    .then(res => res.json())
    .then(res => {
      Router.push("/board")
    })
  }

  handleDelete = e => {
    e.preventDefault();
    fetch('http://192.168.0.15:5000/api/v1/todo/' + this.props._id, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(res => {
      Router.push("/board")
    })
  }

  render() {
    return (
      <div>
          <Todo _id={this.props._id} details={this.props.details} isComplete={this.props.isComplete} />
          <button onClick={this.handleSubmit}>Done</button>
          <button onClick={this.handleDelete}>Delete</button>
      </div>
    )
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.query

    const res = await fetch('http://0.0.0.0:5000/api/v1/todo/' + id)
    const item = await res.json()
    return item.data
  }
}
export default Item;
