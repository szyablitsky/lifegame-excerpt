import React from 'react'

const RangeControl = React.createClass({
  displayName: 'Range',

  handleChange(e) {
    this.setState({value: e.target.value})
    this.props.onChange(this.realValue(e.target.value))
  },

  getInitialState() {
    return {value: this.rangeValue(this.props)}
  },

  componentWillReceiveProps(newProps) {
    this.setState({value: this.rangeValue(newProps)})
  },

  rangeMin() { return this.props.logarithmic ? 0 : this.props.min },
  rangeMax() { return this.props.logarithmic ? this.props.logarithmic : this.props.max },

  rangeValue(props) {
    if (props.logarithmic) {
      this.min = Math.log(props.min)
      this.max = Math.log(props.max)
      this.scale = (this.max - this.min) / props.logarithmic
      return Math.round((Math.log(props.value) - this.min) / this.scale)
    }
    return props.value
  },

  realValue(value) {
    if (this.props.logarithmic) {
      return Math.round(Math.exp(this.min + this.scale * value))
    }
    return value
  },

  valueLabel() {
    const unit = this.props.unit ? <span className='unit'>{this.props.unit}</span> : null
    return(
      <div className='value'>
        {this.realValue(this.state.value).toLocaleString('ru-Ru')}{unit}
      </div>
    )
  },

  render() {
    return(
      <div>
        <input className='range-field' type='range' onChange={this.handleChange}
               min={this.rangeMin()} max={this.rangeMax()} value={this.state.value} />
        <div className='range-legend'>
          <div className='min'>{this.props.minLabel || this.props.min}</div>
          {this.valueLabel()}
          <div className='max'>{this.props.maxLabel || this.props.max}</div>
        </div>
      </div>
    )
  }
})

export default RangeControl
