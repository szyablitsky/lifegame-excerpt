import { createSelector } from 'reselect'

/* eslint-disable no-shadow */

const id = (state, props) => props.id
const comments = (state) => state.comments.comments
const users = (state) => state.comments.users
const userId = (state) => state.user.id

const comment = createSelector([comments, id], (comments, id) => comments[id])
export const author = createSelector([comment, users], (comment, users) => users[comment.authorId])

// eslint-disable-next-line no-confusing-arrow
export const addressee = createSelector([users, comment], (users, comment) =>
  comment.addresseeId ? users[comment.addresseeId].name : null
)
export const createdAt = createSelector([comment], (comment) => comment.createdAt)
export const canReply = createSelector([comment, userId], (comment, userId) => comment.authorId !== userId)
export const content = createSelector([comment], (comment) => comment.content)
