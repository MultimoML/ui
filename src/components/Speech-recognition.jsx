import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(e.target.text.value);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Browser does not support speech recognition");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="text" rows={10} cols={50} value={transcript}></textarea>
        <div className="btn-container">
          <span onClick={resetTranscript} className="btn">
            Clear Text
          </span>
          <button type="submit" className="btn">
            Print Text
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpeechToText;