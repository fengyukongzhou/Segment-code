'use client';

import React, { useState } from 'react';
import SegmentDisplay from './components/SegmentDisplay';
import './styles/SegmentDisplay.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [displayMode, setDisplayMode] = useState<'segment' | 'matrix'>('segment');
  const title = 'LED-DISPLAY';

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="mb-16 flex justify-center">
          <div className="title-container inline-flex justify-center items-center">
            {title.split('').map((char, index) => (
              <SegmentDisplay 
                key={`title-${index}`} 
                value={char} 
                isTitle={true}
                colorIndex={index}
                displayMode={displayMode}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-12 max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 50))}
            className="w-full p-6 text-2xl bg-gray-800/50 text-white rounded-xl border-2 border-gray-700 
                     focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none
                     backdrop-blur-sm transition-all duration-300"
            placeholder="请输入数字或字母（可用空格分隔不同单词）..."
          />
        </div>

        <div className="relative p-12 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="flex flex-wrap justify-center gap-y-12 gap-x-8">
            {input.split(' ').filter(word => word.length > 0).map((word, wordIndex) => (
              <div key={wordIndex} className="flex flex-nowrap overflow-x-auto pb-4 max-w-full">
                <div className="flex flex-nowrap min-w-max px-2">
                  {word.split('').map((char, charIndex) => (
                    <SegmentDisplay 
                      key={`${wordIndex}-${charIndex}`} 
                      value={char}
                      isTitle={false}
                      displayMode={displayMode}
                    />
                  ))}
                </div>
              </div>
            ))}
            {input.length === 0 && (
              <p className="text-gray-400 text-xl py-8">在上方输入框中输入内容...</p>
            )}
          </div>
          
          <button
            onClick={() => setDisplayMode(prev => prev === 'segment' ? 'matrix' : 'segment')}
            className="absolute bottom-4 right-4 p-3 bg-gray-700/50 hover:bg-gray-600/50 
                     text-white rounded-lg border border-gray-600 transition-all duration-300
                     backdrop-blur-sm shadow-lg hover:shadow-xl group"
            title={displayMode === 'segment' ? '切换为16段码' : '切换为7段码'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform transition-transform duration-300 group-hover:rotate-180"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
} 