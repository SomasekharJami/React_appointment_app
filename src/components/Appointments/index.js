import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {mainList: [], name: '', date: '', filter: false}

  onAdding = event => {
    event.preventDefault()
    const {name, date} = this.state

    const newList = {
      id: uuidv4(),
      name,
      date,
      isFavourite: false,
    }

    this.setState(prevState => ({
      mainList: [...prevState.mainList, newList],
      name: '',
      date: '',
    }))
  }

  onToggle = id => {
    this.setState(prevState => ({
      mainList: prevState.mainList.map(eachThing => {
        if (eachThing.id === id) {
          return {...eachThing, isFavourite: !eachThing.isFavourite}
        }
        return eachThing
      }),
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDetail = event => {
    this.setState({date: event.target.value})
  }

  onFiltering = () => {
    this.setState(prevState => ({
      filter: !prevState.filter,
    }))
  }

  render() {
    const {mainList, name, date, filter} = this.state

    const filteredData = mainList.filter(
      eachValue => eachValue.isFavourite === true,
    )

    const filteredList = filter ? filteredData : mainList

    const filtered = filter ? 'actived' : 'fliterBton'

    return (
      <div className="mainCon">
        <div className="innerCon">
          <div className="firstCon">
            <img
              className="mainImg"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
            <div className="formCon">
              <h1 className="mainH">Add Appointment</h1>
              <form className="mainForm" onSubmit={this.onAdding}>
                <label className="labelEl" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="inputEl titleInp"
                  id="title"
                  placeholder="Title"
                  value={name}
                  onChange={this.onChangeName}
                />
                <label className="labelEl" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="inputEl dateInp"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={this.onChangeDetail}
                />
                <button className="bton" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
          <hr />
          <div className="secondCon">
            <div className="head">
              <h1 className="subH">Appointments</h1>
              <button
                className={filtered}
                type="button"
                onClick={this.onFiltering}
              >
                Starred
              </button>
            </div>
            <ul className="listCon">
              {filteredList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  itemDetails={eachItem}
                  onToggle={this.onToggle}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
