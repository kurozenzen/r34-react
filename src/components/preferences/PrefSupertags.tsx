import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ModalId } from '../../data/types'
import { useSupertags } from '../../firebase'
import { PlusIcon } from '../../icons/FontAwesomeIcons'
import { openModal } from '../../redux/actions'
import { RedButton } from '../common/Buttons'
import Setting from '../common/Setting'
import SuperTagEntry from '../common/SuperTagEntry'

export default function PrefSupertags() {
  const supertags = useSupertags()

  const dispatch = useDispatch()
  const openSupertagModal = useCallback(() => dispatch(openModal(ModalId.CREATE_SUPERTAG)), [dispatch])

  return (
    <>
      <Setting
        title='Supertags'
        description='You can manage your supertags here. To create on sign in and try adding two or more tags to your search. Adding supertag to your search will add all the tags inside instead.'
      >
        <RedButton onClick={openSupertagModal}>
          <PlusIcon /> Add new
        </RedButton>
      </Setting>

      <div>
        {Object.entries(supertags).map(([name, details]) => (
          <SuperTagEntry key={name} name={name} {...details}></SuperTagEntry>
        ))}
      </div>
    </>
  )
}
