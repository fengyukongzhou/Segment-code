'use client';

import React, { useState, useRef } from 'react';
import SegmentDisplay from './components/SegmentDisplay';
import html2canvas from 'html2canvas';
import './styles/SegmentDisplay.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [displayMode, setDisplayMode] = useState<'segment' | 'matrix'>('segment');
  const displayContentRef = useRef<HTMLDivElement>(null);
  const title = 'LED-DISPLAY';

  const handleDownload = async () => {
    if (!displayContentRef.current) return;
    
    try {
      // 临时移除所有可能影响渲染的样式
      const container = displayContentRef.current;
      const wordsContainers = container.getElementsByClassName('word-container');
      const innerContainers = container.getElementsByClassName('inner-container');
      const segments = container.getElementsByClassName('segment');
      const matrixSegments = container.getElementsByClassName('matrix-segment');
      
      // 保存原始样式
      const originalStyles = {
        container: {
          padding: container.style.padding,
          gap: container.style.gap,
          display: container.style.display,
        }
      };
      
      // 临时移除样式
      container.style.padding = '0';
      container.style.gap = '0';
      container.style.display = 'inline-flex';
      
      Array.from(wordsContainers).forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.padding = '0';
          el.style.margin = '0';
        }
      });
      
      Array.from(innerContainers).forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.padding = '0';
          el.style.margin = '0';
        }
      });

      // 临时移除未激活段码的背景色
      Array.from(segments).forEach((el) => {
        if (el instanceof HTMLElement && !el.classList.contains('active')) {
          el.style.background = 'transparent';
          el.style.boxShadow = 'none';
        }
      });

      Array.from(matrixSegments).forEach((el) => {
        if (el instanceof HTMLElement && !el.classList.contains('active')) {
          el.style.background = 'transparent';
          el.style.boxShadow = 'none';
        }
      });
      
      const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        removeContainer: true,
      });
      
      // 恢复原始样式
      container.style.padding = originalStyles.container.padding;
      container.style.gap = originalStyles.container.gap;
      container.style.display = originalStyles.container.display;
      
      // 恢复段码样式
      Array.from(segments).forEach((el) => {
        if (el instanceof HTMLElement && !el.classList.contains('active')) {
          el.style.background = '';
          el.style.boxShadow = '';
        }
      });

      Array.from(matrixSegments).forEach((el) => {
        if (el instanceof HTMLElement && !el.classList.contains('active')) {
          el.style.background = '';
          el.style.boxShadow = '';
        }
      });
      
      const link = document.createElement('a');
      link.download = `led-display-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('下载图片时出错:', error);
    }
  };

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
          <div ref={displayContentRef} className="flex flex-wrap justify-center gap-y-12 gap-x-8">
            {input.split(' ').filter(word => word.length > 0).map((word, wordIndex) => (
              <div key={wordIndex} className="word-container flex flex-nowrap overflow-x-auto pb-4 max-w-full">
                <div className="inner-container flex flex-nowrap min-w-max px-2">
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
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={handleDownload}
              className="p-3 bg-gray-700/50 hover:bg-gray-600/50 
                       text-white rounded-lg border border-gray-600 transition-all duration-300
                       backdrop-blur-sm shadow-lg hover:shadow-xl group"
              title="下载图片"
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
                className="transform transition-transform duration-300 group-hover:translate-y-1"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            <button
              onClick={() => setDisplayMode(prev => prev === 'segment' ? 'matrix' : 'segment')}
              className="p-3 bg-gray-700/50 hover:bg-gray-600/50 
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
      </div>
    </main>
  );
} 