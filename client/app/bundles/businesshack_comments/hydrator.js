import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

export function comments(props, railsContext) {
  const camelizedProps = camelizeKeys(props)
  const comment = new Schema('comments')
  const user = new Schema('users') // eslint-disable-line no-shadow
  const normalized = normalize(camelizedProps, {
    comments: arrayOf(comment),
    users: arrayOf(user),
  })
  const { businesshackId } = camelizedProps
  const { userId, userName, userAvatar } = railsContext

  return {
    businesshackId,
    ids: normalized.result.comments || [],
    comments: normalized.entities.comments || {},
    users: {
      [userId]: { name: userName, avatar: userAvatar },
      ...normalized.entities.users,
    },
  }
}

export function user(props, railsContext) {
  return {
    loggedIn: Boolean(railsContext.userId),
    canComment: props.can_comment,
    id: railsContext.userId,
    avatar: railsContext.userAvatar,
  }
}
