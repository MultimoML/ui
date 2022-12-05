import { SpeechProvider } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";
import { SpeechlySegment } from './SpeechlySegment.jsx';

export default function SpeechToText() {
  return (
    <SpeechProvider appId={import.meta.env.PUBLIC_SPEECHLY_APPID}>

      <div className="App">
        <BigTranscript placement="top"/>
        <PushToTalkButton placement="bottom" captureKey=" "/>
        <IntroPopup />
        <SpeechlySegment />
      </div>

    </SpeechProvider>
  );
};
