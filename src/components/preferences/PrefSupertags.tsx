import React from 'react'
import { useDispatch } from 'react-redux'
import { ModalId } from '../../data/types'
import { useSupertags } from '../../hooks/useSupertags'
import { PlusIcon } from '../../icons/FontAwesomeIcons'
import { openModal } from '../../redux/actions'
import { PrimaryButton } from '../designsystem/Buttons'
import Setting from '../designsystem/Setting'
import SupertagEntry from '../designsystem/SupertagEntry'

export default function PrefSupertags() {
  const supertags = useSupertags()

  const dispatch = useDispatch()
  const openSupertagModal = React.useCallback(() => dispatch(openModal(ModalId.CREATE_SUPERTAG)), [dispatch])

  return (
    <>
      <Setting
        title='Supertags'
        description='You can manage your supertags here. To create on sign in and try adding two or more tags to your search. Adding supertag to your search will add all the tags inside instead.'
      >
        <PrimaryButton onClick={openSupertagModal}>
          <PlusIcon /> Add new
        </PrimaryButton>
      </Setting>
      <div>
        {Object.entries(supertags).map(([name, details]) => (
          <SupertagEntry key={name} supertag={{ name, ...details }}></SupertagEntry>
        ))}
      </div>
    </>
  )
}
