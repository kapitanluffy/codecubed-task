import fetch from 'node-fetch'
import React from 'react'
import Todo from '../components/todo'

export interface ITodo {
  _id?: any;
  details: string;
  isComplete: Boolean;
}

export interface IProps {
  items: { page?: Number, pages?: Number, todos?: Array<ITodo> },
  complete?: Boolean
}

export interface IState {
  newItem: ITodo,
  itemList: Array<ITodo>
}

class List extends React.Component<IProps, IState> {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      newItem: { details: "", isComplete: false },
      itemList: props.items.todos
    }
  }

  handleChange = e => {
    this.setState({ newItem: { details: e.target.value, isComplete: false }});
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch('http://192.168.0.15:5000/api/v1/todo', {
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

        <ul>
          {Array.from(Array(this.props.items.pages), (v, i) => {
            return <li key={i}><a href={ "/board?page=" + (i + 1) }>{ (i + 1) }</a></li>
          })}
        </ul>

        <input type="text" value={this.state.newItem.details} onChange={this.handleChange} id="details" />
        <button type="submit" onClick={this.handleSubmit}>Add</button>
      </div>
    )
  }

  static async getInitialProps(ctx) {
    let { page, complete } = ctx.query

    page = page || 1
    complete = complete || false

    const res = await fetch('http://192.168.0.15:5000/api/v1/todo?page=' + page + '&complete=' + complete)
    const items = await res.json()
    return { items: items.data }
  }

}
export default List;
