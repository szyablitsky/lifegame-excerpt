import React from 'react'
import UserSegmentSelect from './segment_select'
import DateSelect from '../controls/date_select'
import RangeControl from '../controls/range_control'
import FormField from '../controls/form_field'
import moment from 'moment'

const BUSINESS_OWNER = 0

const UserDetailsForm = React.createClass({
  displayName: 'UserDetailsForm',

  getInitialState() {
    return {
      errors: {},
      segment: this.props.segment || BUSINESS_OWNER,
      birthDate: this.props.birth_date || moment().subtract(10, 'years').format('YYYY-MM-DD'),
      businessAgeLimit: this.props.business_age_limit || 0,
      businessNiche: this.props.business_niche,
      businessIncome: this.props.business_income || 10000
    }
  },

  segmentChange(segment) { this.setState({segment}) },

  birthDateChange(date) {
    this.setState({
      birthDate: date,
      businessAgeLimit: this.businessAgeLimit(date)
    })
  },

  businessAgeLimitChange(age) { this.setState({businessAgeLimit: age}) },

  businessNicheChange(e) { this.setState({businessNiche: e.target.value}) },

  businessIncomeChange(income) { this.setState({businessIncome: income}) },

  submit(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        user: {
          segment: this.state.segment,
          birth_date: this.state.birthDate,
          business_age_limit: this.businessAgeLimit(),
          business_niche: this.state.businessNiche,
          business_income: this.state.businessIncome
        }
      }),
      url: '/users/details'
    })
    .done(data => {
      window.yaCounterReachGoal('SIGN_UP_COMPLETE')
      window.location = window.location.origin + (data.url || '/posts')
    })
    .fail(data => {
      if (data.responseJSON) {
        this.setState({errors: data.responseJSON.errors})
      } else {
        Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
      }
    })
  },

  businessMinAgeLimit(date) {
    return parseInt(moment(date || this.state.birthDate).fromNow()) + 1
  },

  businessAgeLimit(date) {
    return Math.max(this.businessMinAgeLimit(date), this.state.businessAgeLimit)
  },

  businessFields() {
    if (this.state.segment == BUSINESS_OWNER) {
      return (
        <div>
          <FormField errors={this.state.errors} field='business_niche'>
            <label htmlFor='user_business_niche' className='label -half'>Ниша бизнеса</label>
            <input id='user_business_niche' type='text' ref='businessNiche'
              className='input-field -half' value={this.state.businessNiche}
              onChange={this.businessNicheChange} />
          </FormField>
          <FormField errors={this.state.errors} field='business_income'>
            <label htmlFor='user_business_income' className='label'>
              Результат в чистой прибыли
            </label>
            <RangeControl ref='businessIncome' className='range-field'
              min={10000} max={10000000} logarithmic={90} minLabel='10 тыс' maxLabel='10 млн'
              value={this.state.businessIncome} unit='руб' onChange={this.businessIncomeChange} />
          </FormField>
        </div>
      )
    }
  },

  render() {
    return (
      <form className='details-form' onSubmit={this.submit}>
        <div className='form-header'>
          <span className='action'>Ваш персонаж</span>
        </div>
        <div className='description' style={{color: 'white', height: 0}}>
          Это поможет нам понять, как мы можем быть максимально полезными для вас
        </div>
        <FormField errors={this.state.errors} field='segment'>
          <label htmlFor='user_segment' className='label'>Кто вы?</label>
          <UserSegmentSelect ref='segment' value={this.state.segment} id='user_segment'
            onChange={this.segmentChange} />
        </FormField>
        <FormField errors={this.state.errors} field='birth_date'>
          <label htmlFor='user_birth_date' className='label'>Дата рождения</label>
          <DateSelect ref='birthDate' id='user_birth_day' value={this.state.birthDate}
            onChange={this.birthDateChange} />
        </FormField>
        <FormField errors={this.state.errors} field='business_age_limit'>
          <label htmlFor='user_business_age_limit' className='label'>
            До скольки лет планируете активно заниматься бизнесом?
          </label>
          <RangeControl ref='businessAgeLimit' className='range-field'
            min={this.businessMinAgeLimit()} max={100} value={this.businessAgeLimit()}
            onChange={this.businessAgeLimitChange} />
        </FormField>
        {this.businessFields()}
        <input type='submit' className='submit-button -center' value='Завершить регистрацию' />
      </form>
    )
  }
})

const Factory = (props) => <UserDetailsForm {...props} />
window.UserDetailsForm = Factory
export default Factory
