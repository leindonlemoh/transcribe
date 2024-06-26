import React,{useState,useRef} from 'react';
import SunEditor from 'suneditor-react';
import './styles/index.css'
import 'suneditor/dist/css/suneditor.min.css'

function App() {
const editorRef = useRef(null);

  const [fileName, setFileName] = useState('')

const handleButtonClick = (speaker) => {
  if (editorRef.current) {
    editorRef.current.insertHTML('<br/>' + speaker);
  }
};

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileName(url);
    }
  };
  return (
    <div className="main-container">

      <div className='upload-audio'>
        <input type="file" id="myFile" name="filename" onChange={onUpload}></input>
      </div>
      {fileName && (
        <div className='audio-player'>
          <audio controls>
            <source src={fileName} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
<div className='buttons'>
  <button onClick={(e)=>{handleButtonClick("Speaker 1:")}}>1</button>
  <button onClick={(e)=>{handleButtonClick("Speaker 2:")}}>2</button>
  <button onClick={(e)=>{handleButtonClick("Speaker 3:")}}>3</button>
  <button onClick={(e)=>{handleButtonClick("Speaker 4:")}}>4</button>
</div>
      <div className='main-content'>
<SunEditor getSunEditorInstance={editor => { editorRef.current = editor; }} />

      </div>

    </div>
  );
}

export default App;
