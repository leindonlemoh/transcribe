import React,{useState} from 'react';
import icon from "./Image/info.png"
import Info from './Info';
const Modal = ({
  isOpen,
  setOpen,
  speaker1,
  speaker2,
  speaker3,
  speaker4,
  playKey,
  pauseKey,
  volumeUp,
  volumeDown,
  setVolumeUp,
  setVolumeDown,
  speakerF1,
  speakerF2,
  speakerF3,
  speakerF4,
}) => {
  // Handler function for input changes
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
   
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className='modal-container' style={{ display: isOpen === false ? 'none' : 'flex' }}>
      <div className='modal-main'>
        <div className='modal-header'>
          <div className='header'>
            <p>Edit Shortcut Keys  <img
        src={icon}
        alt="Help Icon"
        onMouseEnter={() => setIsDialogOpen(true)}
        onMouseLeave={() => setIsDialogOpen(false)}
        style={{ cursor: 'pointer', width: '50px', height: '50px' }} // Adjust size as needed
        /> 
        </p>
      <Info
        isOpen={isDialogOpen}
        content={
          <div>
            <p>This is a floating dialog box with helpful information.</p>
            use ALT key combined on your  desire keys<br/>
            some of they keys may not work it depends on the browser your using
          </div>
        }
        />
          </div>
          <div className='close-modal-btn'>
            <button className='close-btn' aria-label='Close' onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>
        </div>
        <div className='modal-content'>
          <div className='modal-content-col'>
            <div className='keys-label'>
              <div className='columns'>
                <div className='key-name'>Play</div>
                <div className='key-input'>
                  Alt + <input value={playKey} onChange={(e) => handleInputChange(e, setVolumeUp)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Pause</div>
                <div className='key-input'>
                  Alt + <input value={pauseKey} onChange={(e) => handleInputChange(e, setVolumeDown)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Volume Up</div>
                <div className='key-input'>
                  Alt + <input value={volumeUp} onChange={(e) => handleInputChange(e, setVolumeUp)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Volume Down</div>
                <div className='key-input'>
                  Alt + <input value={volumeDown} onChange={(e) => handleInputChange(e, setVolumeDown)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Speaker 1</div>
                <div className='key-input'>
                  Alt + <input value={speaker1} onChange={(e) => handleInputChange(e, speakerF1)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Speaker 2</div>
                <div className='key-input'>
                  Alt + <input value={speaker2} onChange={(e) => handleInputChange(e, speakerF2)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Speaker 3</div>
                <div className='key-input'>
                  Alt + <input value={speaker3} onChange={(e) => handleInputChange(e, speakerF3)} />
                </div>
              </div>

              <div className='columns'>
                <div className='key-name'>Speaker 4</div>
                <div className='key-input'>
                  Alt + <input value={speaker4} onChange={(e) => handleInputChange(e, speakerF4)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
