import { useStore } from '@nanostores/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'react-feather';
import { Fragment } from 'react';

import { graphParams, setIndexBy, setKeyBy } from './graph-store';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props) {
  const $graphParams = useStore(graphParams);

  function set(option) {
    if (invertWithOtherAxis(option)) {
      console.debug("inverted axis")
      return
    }

    switch (props.axis) {
      case "indexBy":
        setIndexBy(option)
        break;
      case "keyBy":
        setKeyBy(option)
        break;
      default:
        throw Error(props.axis, "not supported")
    }

    console.debug(option)
  }

  function disable(option) {
    return option == $graphParams[props.axis]
  }

  function invertWithOtherAxis(option) {
    const possibleAxes = ["indexBy", "keyBy"]

    if ($graphParams[possibleAxes.filter((axis) => props.axis != axis)[0]] == option) {
      const tempIndexBy = $graphParams.indexBy
      setIndexBy($graphParams.keyBy)
      setKeyBy(tempIndexBy)

      return true
    }

    return false
  }

  return (
    <Menu as="div" className="relative inline-block text-left w-36">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-0 focus:ring-offset-gray-100">
          {$graphParams[props.axis]}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {$graphParams.allKeys.map((option, index) => (
              <Menu.Item key={option} {...(disable(option) ? {disabled:true} : {})}>
                {({ active }) => (
                  <button 
                    onClick={() => set(option)}
                    className={classNames(
                      (active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                      (disable(option) ? 'opacity-75 bg-red-100':''),
                      'block px-4 py-2 text-sm w-full'
                      )}
                  >
                    {option}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}