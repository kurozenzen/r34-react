import produce from 'immer'
import { ModalId } from '../../data/types'
import { AppAction, CLOSE_MODAL, OPEN_MODAL } from '../actions'

/**
 * Key is postId, Value is time of like
 */
export interface ModalsState {
  openModal: ModalId | null
}

const initialModalsState: ModalsState = {
  openModal: null,
}

const setOpenModal = (state: ModalsState, modalId: ModalId | null) =>
  produce(state, (draft) => {
    draft.openModal = modalId
  })

const modals = (state: ModalsState = initialModalsState, action: AppAction): ModalsState => {
  switch (action.type) {
    case OPEN_MODAL:
      return setOpenModal(state, action.modalId)
    case CLOSE_MODAL:
      return setOpenModal(state, null)
    default:
      return state
  }
}

export default modals
