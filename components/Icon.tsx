import React, { useState, useRef } from 'react';
import { useDebounce, useOnClickOutside } from 'usehooks-ts';
const Icons = ({ setContent, content, top = false }: any) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = () => {
    setShow(false);
  };

  const reactions = [
    '❤️',
    '😆',
    '😯',
    '😢',
    '😡',
    '👍',
    '👎',
    '😄',
    '😂',
    '😍',
    '😘',
    '😗',
    '😚',
    '😳',
    '😭',
    '😓',
    '😤',
    '🤤',
    '👻',
    '💀',
    '🤐',
    '😴',
    '😷',
    '😵',
  ];

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      className={`relative inline-block text-gray-700 ${
        top && 'bottom-[10px]'
      } `}
      ref={ref}
    >
      <span className="cursor-pointer" onClick={() => setShow(!show)}>
        <span className="text-xl opacity-40">😄</span>
      </span>

      {show && (
        <div className="absolute z-10 -ml-4 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="flex flex-wrap p-2">
            {reactions.map((icon) => (
              <span
                key={icon}
                className="m-1 cursor-pointer"
                onClick={() => setContent(content + icon)}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Icons;
