import React,{useState,useRef,useEffect} from 'react';
import SunEditor from 'suneditor-react';
import './styles/index.css'
import 'suneditor/dist/css/suneditor.min.css'
import playIcon from './Image/play.svg'
import pauseIcon from './Image/pause.svg'
import Modal from './Modal';
import { Document, Packer, Paragraph, TextRun } from 'docx';
function App() {

  const editorRef = useRef(null);
  const [isOpen,setIsOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const [type, setType] = useState('keys')

  const [speaker1,setSpeaker1]=useState('1')
  const [speaker2,setSpeaker2]=useState('2')
  const [speaker3,setSpeaker3]=useState('3')
  const [speaker4,setSpeaker4]=useState('4')
  const [playKey,setPlayKey]=useState('[')
  const [pauseKey,setPauseKey]=useState(']')
  const [volumeUp,setVolumeUp]=useState('=')
  const [volumeDown,setVolumeDown]=useState('-')


  const [one,setOne]=useState('Speaker 1');
  const [two,setTwo]=useState('Speaker 2');
  const [three,setThree]=useState('Speaker 3');
  const [four,setFour]=useState('Speaker 4');

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time ,setTime] = useState(0)
  const [test ,setTest] = useState('')

  const [editorContent, setEditorContent] = useState('');


  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileName(url);
    }
  };
  
const handleButtonClick = (speaker) => {
  if (editorRef.current) {
    editorRef.current.insertHTML('<p> ' + speaker + ": </p>");
  }
};

    const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };


    const handleVolumeChange = (change) => {

  if (audioRef.current) {
    // Get the current volume and adjust it
    const newVolume = Math.min(Math.max(audioRef.current.volume + change, 0), 1); // Keep volume between 0 and 1
return    audioRef.current.volume = newVolume;
  
};

  };
  useEffect(() => {
    const handleKeyDown = (event) => {
  if (event.altKey && event.key === speaker1) {
    handleButtonClick(one);
  } else if (event.altKey && event.key === speaker2) {
    handleButtonClick(two);
  } else if (event.altKey && event.key === speaker3) {
    handleButtonClick(three);
  } else if (event.altKey && event.key === speaker4) {
    handleButtonClick(four);
  } else if (event.altKey && event.key === playKey) {
    playAudio();
  } else if (event.altKey && event.key === pauseKey) {
    pauseAudio();
  } else if (event.altKey && event.key === volumeUp) {
    handleVolumeChange(0.1); // Increase volume by 0.1
  } else if (event.altKey && event.key === volumeDown) {
    handleVolumeChange(-0.1); // Decrease volume by 0.1
  }
};



    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [one, two, three, four,time,test]);


  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    document.querySelector('.seek-bar').value = progress;
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * audioRef.current.duration

    audioRef.current.currentTime = time;
  };


  const handleAudioEnd = () => {
    console.log('Audio playback has ended.');
    setIsPlaying(false);
  };

const handleEditorChange = (content) => {
  setEditorContent(content);
  console.log("Editor Content Updated:", content); 
};



const downloadFile = async (format) => {
  if(editorContent == ''){

     setIsOpen(true)

    setType('notif')
    return
  }


  if (format === 'docx') {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = editorContent;

    const lines = [];
    const children = tempElement.childNodes;
    children.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {

        lines.push(child.textContent);
      } else if (child.nodeName === 'BR') {
    lines.push(child.textContent); 
    lines.push('');
      } else if (child.nodeName === 'P') {

        lines.push(child.textContent); 
        lines.push(''); 
      }
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: lines.map((line) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  break: 1, 
                }),
              ],
            });
          }),
        },
      ],
    });

    try {
      const blob = await Packer.toBlob(doc);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'editor-content.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating the docx file:', error);
    }
  } else {
    // Handle other formats like TXT as before
    const tempElement = document.createElement('div');
    tempElement.innerHTML = editorContent;
    let plainText = tempElement.innerText || tempElement.textContent;
    plainText = plainText.replace(/(<br\s*\/?>|\n)/g, '\n'); // Convert <br> to new lines
    const blob = new Blob([plainText], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'editor-content.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};



  useEffect(() => {
    console.log("isPlaying",isPlaying)

    console.log(editorContent)

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [isPlaying,isOpen,editorContent]);
  
  return (
    <div>
      <section className='sortcutkey-btn-container'> 
        <button className='shortcut-key-btn' onClick={(e)=>{setIsOpen(true);
          setType('keys')}}> Shortcut Keys</button>
      </section>
    <div className="main-container">

{!fileName && <div className='upload-audio' onClick={() => document.getElementById('myFile').click()}>
    <input type="file" id="myFile" name="filename" accept="audio/*" onChange={onUpload} />
    <h2>Drop files here or click to upload.</h2>
</div>}

 {fileName && (
        <div className='audio-player'>
          {!isPlaying ? (
            <button className="play-button" onClick={playAudio}>
              <img src={playIcon} width={30} alt="My Icon" />
              </button>
          ) : (
            <button className="pause-button" onClick={pauseAudio}>
              <img src={pauseIcon} width={30} alt="My Icon" />
              </button>
          )}
          <input type="range" className="seek-bar" onInput={handleSeek} />
          <input type="range" className="volume-bar" max="1" step="0.01" defaultValue="1" onInput={handleVolumeChange} />
          <audio ref={audioRef} src={fileName} onTimeUpdate={handleTimeUpdate} />
        </div>
      )}
      
<section className='buttons'>
  <button className='speaker-button one' onClick={(e)=>{handleButtonClick(speaker1)}}>{one}</button> 
  <input className="speaker-input" type='text' value={one} onChange={handleInputChange(setOne)}/>
  <button className='speaker-button two' onClick={(e)=>{handleButtonClick(speaker2)}}>{two}</button> 
  <input className="speaker-input" type='text' value={two} onChange={handleInputChange(setTwo)}/>
  <button className='speaker-button three' onClick={(e)=>{handleButtonClick(speaker3)}}>{three}</button> 
  <input className="speaker-input" type='text' value={three} onChange={handleInputChange(setThree)}/>
  <button className='speaker-button four' onClick={(e)=>{handleButtonClick(speaker4)}}>{four}</button> 
  <input className="speaker-input" type='text' value={four} onChange={handleInputChange(setFour)}/>
</section>
      <section className='main-content'>

<SunEditor getSunEditorInstance={editor => { editorRef.current = editor; }} 
  onChange={handleEditorChange}
  />

<div>
<button onClick={() => downloadFile('txt')}>Download as TXT</button>
      <button onClick={() => downloadFile('docx')}>Download as DOCX</button>
      </div>
      </section>
    </div>
<Modal isOpen={isOpen} setOpen={setIsOpen} 
type={type}
speaker1={speaker1}
speaker2={speaker2}
speaker3={speaker3}
speaker4={speaker4}
speakerF1={setSpeaker1}
speakerF2={setSpeaker2}
speakerF3={setSpeaker3}
speakerF4={setSpeaker4}
playKey={playKey}
pauseKey={pauseKey}
setPlayKey={setPlayKey}
setPauseKey={setPauseKey}
setVolumeUp={setVolumeUp}
setVolumeDown={setVolumeDown}
volumeUp={volumeUp}
volumeDown={volumeDown}
/>
    </div>
  );
}

export default App;

