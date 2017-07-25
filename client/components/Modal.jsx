import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

function Modal (props) {
  return (
    <div className='modal'>
     <ModalContainer onClose={props.onClose}>
        <ModalDialog onClose={props.onClose}>
          {props.content}
        </ModalDialog>
      </ModalContainer>
    </div>
  )
}

export default Modal
