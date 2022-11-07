import { Switch } from "@headlessui/react";
import { Fragment, useState } from "react";
import { setNegativeValues } from "./graph-store";

export default function GraphSwitch() {
  const [enabled, setEnabled] = useState(false)

  if (setEnabled) {
    setNegativeValues(`${enabled? 'No': ''}`)
  }

  return (
  <Switch
    checked={enabled}
    onChange={setEnabled}
    className={`${
      enabled ? 'bg-blue-600' : 'bg-gray-200'
    } relative inline-flex h-6 w-11 items-center rounded-full mr-28`}
  >
    <span
      className={`${
        enabled ? 'translate-x-6' : 'translate-x-1'
      } inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-200`}
    />
    <span className="w-full absolute pl-12 whitespace-nowrap">Negative values</span>
  </Switch>
  )
}
