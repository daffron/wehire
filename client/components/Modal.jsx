import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

function Modal (props) {
  return (
    <div className='modal'>
     <ModalContainer>
        <ModalDialog>
          {props.content}
        </ModalDialog>
      </ModalContainer>
    </div>
  )
}

export default Modal
