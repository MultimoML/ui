import { useSpeechContext } from "@speechly/react-client";
import { useEffect } from "react";

export function SpeechlySegment() {
  const { segment } = useSpeechContext()

  useEffect(() => {
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      console.log(segment);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        console.log("✅", segment)
        const sentence = segment.words.map(word => word.value).concat(" ")
        
        if ( sentence.includes("refresh") ||
          sentence.includes("reload")) {
            window.location.reload();
        }
      }
    }
  }, [segment])
}