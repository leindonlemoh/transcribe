import React from 'react'

const Modal = ({isOpen,setOpen}) => {

  return (
    <div className='modal-container' style={{display: isOpen == false ? 'none':'flex'}}>
        
        <div className='modal-main'>
          <div className='modal-header'>
            <div className='header'>
            <p>Edit Shortcut Keys</p>
            </div>
          <div className='close-modal-btn'>

        <button class="close-btn" aria-label="Close"
        onClick={(e)=>{setOpen(false)}}
        >&times;</button>
        </div>
          </div>
          <div className='modal-content'>
            <div className='modal-content-col'>
              <div className='keys-label'>
                <ul>
                  <li>Play/Pause</li>
                  <li>Volume</li>
                  <li>Speaker 1</li>
                  <li>Speaker 2</li>
                  <li>Speaker 3</li>
                  <li>Speaker 4</li>
                </ul>
              </div>
              <div className='keys-edit'>
                <ul>
                  <li><input/></li>
                  <li><input/></li>
                  <li><input/></li>
                  <li><input/></li>
                  <li><input/></li>
                  <li><input/></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Modal