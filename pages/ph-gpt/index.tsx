/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { sendMsgToOpenAI } from '@/lib/openai';
const PHGPTPage = () => {
  const [input, setInput] = useState('');
  const handleSend = async () => {
    const res = await sendMsgToOpenAI(input);
    console.log('🚀 ~ file: index.tsx:9 ~ handleSend ~ res:', res);
  };
  return (
    <div className="app flex">
      <section className="side-bar flex flex-col justify-between">
        <button className="button rounded-md p-[10px] mx-2">+ New Chat</button>
        <ul className="history p-[10px] m-[10px] h-full">
          <li className="py-[15px] cursor-pointer">a</li>
        </ul>
        <nav className="border-t border-gray-600 p-[10px]  m-[10px]">
          <p>Made by LPH</p>
        </nav>
      </section>
      <section className="main  flex flex-col justify-between items-center text-center">
        <h1 className="text-3xl font-semibold mt-4 text-white">PH-GPT</h1>
        <ul className="feed"></ul>
        <div className="bottom-section w-full flex flex-col justify-center items-center">
          <div className="input-container relative w-full max-w-[850px] flex gap-4 items-center">
            <input
              type="text"
              className="input rounded-xl !bg-[rgba(255,255,255,0.05)] focus:outline-none"
              name="input"
              id=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div
              id="submit"
              className="absolute bottom-4 right-4 top-3 cursor-pointer"
              onClick={handleSend}
            >
              <SendIcon />
            </div>
          </div>
          <p className="info text-gray-600 w-[80%] mt-4">
            I generate text with artificial intelligence. Provide content the
            power of ChatGPT Text Generation and SEO, to write everything from
            product descriptions and social media posts, to long form blog
            posts. Welcome to the Best AI Text Generator
          </p>
        </div>
      </section>
    </div>
  );
};

export default PHGPTPage;
