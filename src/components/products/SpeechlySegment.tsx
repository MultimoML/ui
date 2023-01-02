import { useSpeechContext } from "@speechly/react-client";
import { useEffect } from "react";
import { setSortModel } from "./datagrid-store";

export function SpeechlySegment() {
  const { segment } = useSpeechContext()

  useEffect(() => {
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      console.log(segment);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        console.log("✅", segment)

        let words = segment.words.map(word => word.value)
        let sentence = words.join(" ")
        
        // TODO:
        if (words.includes("sort")) {
          words = words.filter(e => e !== "by");

          console.log("entered sort")

          words = words.filter(e => e !== "sort");
          
          let sortDirection: "desc" | "asc"

          if (words.includes("descending")) {
            words = words.filter(e => e !== "descending");
            sortDirection = "desc"
          } else if  (words.includes("ascending")) {
            words = words.filter(e => e !== "ascending");
            sortDirection = "asc"
          } else {
            return
          }

          let sortName = words.join("-")

          console.debug("setting sortModel", sortName, sortDirection)

          setSortModel(sortName, sortDirection)
        }
      }
    }
  }, [segment])

  return (
    <>
    </>
  )
}