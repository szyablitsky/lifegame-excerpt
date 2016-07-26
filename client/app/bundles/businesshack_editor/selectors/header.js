import { createSelector } from 'reselect'
import includes from 'lodash/includes'

import * as statusTypes from '../constants/status'

const hackStatus = (state) => state.hack.get('status')
const stepsStatus = (state) => state.steps.get('status')
const steps = (state) => state.steps.get('steps')

/* eslint-disable no-shadow */

const statuses = createSelector(
  [steps, hackStatus], (steps, hackStatus) =>
    steps
      .valueSeq()
      .map((step) => step.get('status'))
      .toList()
      .push(hackStatus)
      .push(stepsStatus)
      .toJS()
)

export const status = createSelector(
  [statuses], (statuses) => {
    if (includes(statuses, statusTypes.ERROR)) return statusTypes.ERROR
    if (includes(statuses, statusTypes.SAVING)) return statusTypes.SAVING
    if (includes(statuses, statusTypes.CHANGED)) return statusTypes.CHANGED
    return statusTypes.SAVED
  }
)
