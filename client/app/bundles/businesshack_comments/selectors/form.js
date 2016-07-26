import { createSelector } from 'reselect'

/* eslint-disable no-shadow */

const addresseeId = (state) => state.comments.addresseeId
const users = (state) => state.comments.users

// eslint-disable-next-line no-confusing-arrow
export const addressee = createSelector([users, addresseeId], (users, addresseeId) =>
  addresseeId ? users[addresseeId].name : null
)
