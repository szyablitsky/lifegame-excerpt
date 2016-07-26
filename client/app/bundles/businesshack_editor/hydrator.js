import { normalize, Schema, arrayOf } from 'normalizr'
import each from 'lodash/each'

import * as editorStatus from './constants/status'

export function hackState(props) {
  const { benefits2, subtitle, description2 } = props.data

  return {
    data: {
      ...props.data,
      subtitle: subtitle || '',
      description2: description2 || '',
      benefits2: benefits2.length > 0 ? benefits2 : ['', '', ''],
    },
  }
}

export function stepsState(props) {
  const step = new Schema('steps')
  const normalizedSteps = normalize(props, { steps: arrayOf(step) })
  const steps = {}
  each(normalizedSteps.entities.steps, (step, id) => { // eslint-disable-line no-shadow
    steps[id] = {
      data: {
        title: step.title,
        content: step.content,
      },
      status: editorStatus.SAVED,
    }
  })

  return {
    stepIds: normalizedSteps.result.steps,
    steps,
  }
}
