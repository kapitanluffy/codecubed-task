import fetch from 'node-fetch'
import React from 'react'
import Todo from '../components/todo'
import List from '../components/list'

export interface ITodo {
  _id?: any;
  details: string;
  isComplete: Boolean;
}

export interface IProps {
  todos: Array<ITodo>,
  total: Number,
  limit: Number,
  page: Number,
  pages: Number
}

export interface IState {
  newItem: ITodo,
  itemList: Array<ITodo>
}

class Board extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      newItem: { details: "", isComplete: false },
      itemList: props.todos
    }
    console.log(props)
  }

  handleChange = e => {
    this.setState({ newItem: { details: e.target.value, isComplete: false }});
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/v1/todo', {
      method: 'post', body: JSON.stringify(this.state.newItem), headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(res => {
      let todo: ITodo = res.todo
      let itemList = this.state.itemList;
      itemList.unshift(todo)

      this.setState({ newItem: { details: "", isComplete: false }})
      this.setState({ itemList: itemList })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.itemList.map((v, i) => {
            return <li key={i}><a href={ "/todo/" + v._id }><Todo _id={v._id} details={v.details} isComplete={v.isComplete} /></a></li>
          })}
        </ul>
        <div>
          <span>Page: </span>
          {Array.from(Array(this.props.pages), (v, i) => {
            return <span key={i}><a href={ "/board?page=" + (i + 1) }>{ (i + 1) }</a></span>
          })}
        </div>
        <input type="text" value={this.state.newItem.details} onChange={this.handleChange} id="details" />
        <button type="submit" onClick={this.handleSubmit}>Add</button>
      </div>
    )
  }

  static async getInitialProps(ctx) {
    const { page } = ctx.query
    const res = await fetch('http://localhost:5000/api/v1/todo?page=' + page)
    const items = await res.json()
    return items.data
  }

}
export default Board;
