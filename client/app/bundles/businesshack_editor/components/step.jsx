import React from 'react'
import TextArea from 'react-autosize-textarea'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import ScribeEditor from 'shared/components/scribe_editor'

import css from './step.sass'

export default class Step extends React.Component {
  constructor(props) {
    super(props)
    this.save = debounce(props.saveStep, 500)
  }

  handleChange(key, e) {
    const { id, changeStep } = this.props
    const value = e.target ? e.target.value : e
    if (this.props[key] === value) return
    changeStep(id, key, value)
    this.save(id)
  }

  handleDelete() {
    if (!confirm('Удалить шаг?')) return

    const { id, deleteStep } = this.props
    deleteStep(id)
  }

  handleMoveUp() {
    const { canMoveUp, id, moveUp } = this.props
    if (canMoveUp) moveUp(id)
  }

  handleMoveDown() {
    const { canMoveDown, id, moveDown } = this.props
    if (canMoveDown) moveDown(id)
  }

  render() {
    const {
      position, title, content, imagesUploadUrl, canMoveUp, canMoveDown,
    } = this.props
    const moveUpClassName = classNames(css.button, { [css.disabled]: !canMoveUp })
    const moveDownClassName = classNames(css.button, { [css.disabled]: !canMoveDown })

    return (
      <div className='hack-step'>
        <div className={css.controls}>
          <div className={css.button} title='Удалить шаг'
               onClick={this.handleDelete.bind(this)}>
            <i className='fa fa-trash' />
          </div>
          <div className={moveUpClassName} title='Переместить выше'
               onClick={this.handleMoveUp.bind(this)}>
            <i className='fa fa-arrow-up' />
          </div>
          <div className={moveDownClassName} title='Переместить ниже'
               onClick={this.handleMoveDown.bind(this)}>
            <i className='fa fa-arrow-down' />
          </div>
        </div>
        <div className={`hack-step-title ${css.title}`}>
          {`${position + 1}. `}
          <TextArea className={css.input} value={title}
                    placeholder = 'Заголовок шага'
                    onChange={this.handleChange.bind(this, 'title')}/>
        </div>
        <ScribeEditor content={content} placeholder='Описание шага'
                      imagesUploadUrl={imagesUploadUrl}
                      onChange={this.handleChange.bind(this, 'content')} />
      </div>
    )
  }
}

Step.propTypes = {
  position: React.PropTypes.number.isRequired,
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  imagesUploadUrl: React.PropTypes.string.isRequired,
  canMoveUp: React.PropTypes.bool.isRequired,
  canMoveDown: React.PropTypes.bool.isRequired,
  changeStep: React.PropTypes.func.isRequired,
  saveStep: React.PropTypes.func.isRequired,
  deleteStep: React.PropTypes.func.isRequired,
  moveUp: React.PropTypes.func.isRequired,
  moveDown: React.PropTypes.func.isRequired,
}
