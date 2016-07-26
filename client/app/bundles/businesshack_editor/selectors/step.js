import { createSelector } from 'reselect'

const businesshackId = (state) => state.hack.getIn(['data', 'id'])
const stepId = (state, props) => props.id
const position = (state, props) => props.position
const size = (state) => state.steps.get('stepIds').size

/* eslint-disable no-shadow */

export const imagesUploadUrl = createSelector(
  [businesshackId, stepId], (businesshackId, stepId) =>
    `/api/businesshacks/${businesshackId}/steps/${stepId}/pictures`
)

export const canMoveUp = createSelector(
  [position], (position) => position > 0
)

export const canMoveDown = createSelector(
  [position, size], (position, size) => position < size - 1
)
