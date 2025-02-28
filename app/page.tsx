'use client';

import React, { useState, useRef } from 'react';
import SegmentDisplay from './components/SegmentDisplay';
import html2canvas from 'html2canvas';
import './styles/SegmentDisplay.css';
import { FaExchangeAlt, FaDownload, FaGithub } from 'react-icons/fa';

export default function Home() {
  const [input, setInput] = useState('');
  const [displayMode, setDisplayMode] = useState<'segment' | 'matrix'>('segment');
  const displayContentRef = useRef<HTMLDivElement>(null);
  const title = 'LED-DISPLAY';

  const handleDownload = async () => {
    if (!displayContentRef.current) return;
    
    try {
      const container = displayContentRef.current;
      const wordsContainers = container.getElementsByClassName('word-container');
      const innerContainers = container.getElementsByClassName('inner-container');
      const segments = container.getElementsByClassName('segment');
      const matrixSegments = container.getElementsByClassName('matrix-segment');
      
      const originalStyles = {
        container: {
          padding: container.style.padding,
          gap: container.style.gap,
          display: container.style.display,
        }
      };
      
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
      
      container.style.padding = originalStyles.container.padding;
      container.style.gap = originalStyles.container.gap;
      container.style.display = originalStyles.container.display;
      
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
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-12">
      <a
        href="https://github.com/fengyukongzhou/Segment-code"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 text-white/80 hover:text-white transition-colors"
        title="查看 GitHub 源码"
      >
        <FaGithub className="w-8 h-8" />
      </a>

      <div className="title-container mb-16 animate-[float_4s_ease-in-out_infinite]">
        {title.split('').map((char, index) => (
          <div key={index} className="mx-1.5 hover:scale-110 transition-transform">
            <SegmentDisplay
              value={char}
              isTitle={true}
              colorIndex={index}
              displayMode={displayMode}
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-10">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-lg relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入数字或字母..."
              className="w-full min-w-[300px] min-h-[60px] px-6 py-4 text-lg bg-opacity-10 bg-white backdrop-blur-lg rounded-2xl 
                border border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 
                outline-none transition-all duration-300 text-white placeholder-white/50
                shadow-lg group-hover:shadow-xl"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-color/20 to-secondary-color/20 
              blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          </div>
          
          <div ref={displayContentRef} 
            className="w-3/4 min-h-[400px] flex flex-wrap justify-center gap-6 p-10 bg-black/20 backdrop-blur-xl 
              rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500
              animate-[glow_3s_ease-in-out_infinite]">
            {input.split(' ').map((word, wordIndex) => (
              <div key={wordIndex} className="word-container flex justify-center items-center hover:scale-105 transition-transform">
                <div className="inner-container flex">
                  {word.split('').map((char, charIndex) => (
                    <SegmentDisplay
                      key={charIndex}
                      value={char}
                      displayMode={displayMode}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => setDisplayMode(displayMode === 'segment' ? 'matrix' : 'segment')}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-color to-secondary-color rounded-xl 
              text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg 
              hover:shadow-xl active:scale-95 hover:translate-y-[-2px]"
          >
            <FaExchangeAlt className="text-xl" />
            <span>切换显示</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-color to-accent-color rounded-xl 
              text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg 
              hover:shadow-xl active:scale-95 hover:translate-y-[-2px]"
          >
            <FaDownload className="text-xl" />
            <span>下载图片</span>
          </button>
        </div>
      </div>
    </main>
  );
}