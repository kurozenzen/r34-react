import produce from 'immer'
import { AppAction, LIKE_POST } from '../actions'

/**
 * Key is postId, Value is time of like
 */
export type LikesState = Record<number, number>

const initialLikesState: LikesState = {}

const likePost = (state: LikesState, postId: number) =>
  produce(state, (draft) => {
    if (!(postId in state)) {
      draft[postId] = Date.now()
    }

    // NOTE: Might need to introduce a cap here...
    // Like 1000 likes max, delete oldest when more are added?
  })

const likes = (state: LikesState = initialLikesState, action: AppAction): LikesState => {
  switch (action.type) {
    case LIKE_POST:
      return likePost(state, action.postId)
    default:
      return state
  }
}

export default likes
