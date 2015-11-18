import React from 'react'
import moment from 'moment'

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

const zeropad = (i) => i < 10 ? '0' + i : i

const DateSelect = React.createClass({
  displayName: 'DateSelect',

  getInitialState() {
    return {
      day: moment(this.props.value).format('DD'),
      month: moment(this.props.value).format('MM'),
      year: moment(this.props.value).format('YYYY'),
    }
  },

  handleDay(e) {
    this.state.day = e.target.value // TODO: fix this
    this.setState({day: e.target.value})
    this.props.onChange(this.value())
  },

  handleMonth(e) {
    this.state.month = e.target.value // TODO: fix this
    this.setState({month: e.target.value})
    this.props.onChange(this.value())
  },

  handleYear(e) {
    this.state.year = e.target.value // TODO: fix this
    this.setState({year: e.target.value})
    this.props.onChange(this.value())
  },

  value() { return `${this.state.year}-${this.state.month}-${this.state.day}` },

  days() {
    const maxDay = moment("#{this.state.year}-#{this.state.month}", "YYYY-MM").daysInMonth()
    let days = []
    for (let i = 1; i <= maxDay; i++) {
      days.push(<option key={i}>{zeropad(i)}</option>)
    }
    return days
  },

  months() {
    let months = []
    for (let i = 0; i < MONTHS.length; i++) {
      months.push(<option key={i} value={zeropad(i+1)}>{MONTHS[i]}</option>)
    }
    return months
  },

  years() {
    const fromYear = moment().subtract(10,'years').year()
    const toYear = moment().subtract(100,'years').year()
    let years = []
    for (let i = fromYear; i >= toYear; i--) {
      years.push(<option key={i}>{i}</option>)
    }
    return years
  },

  render() {
    return(
      <div className='date-select'>
        <select ref='day' className='day' value={this.state.day} onChange={this.handleDay}>
          {this.days()}
        </select>
        <select ref='month' className='month' value={this.state.month} onChange={this.handleMonth}>
          {this.months()}
        </select>
        <select ref='year' className='year' value={this.state.year} onChange={this.handleYear}>
          {this.years()}
        </select>
      </div>
    )
  }
})

export default DateSelect
