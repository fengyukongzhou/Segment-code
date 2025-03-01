'use client';

import React, { useState, useRef } from 'react';
import SegmentDisplay from './components/SegmentDisplay';
import html2canvas from 'html2canvas';
import './styles/SegmentDisplay.css';
import { FaExchangeAlt, FaDownload, FaGithub, FaPalette, FaLanguage } from 'react-icons/fa';

// 文本映射
const textContent = {
  en: {
    inputPlaceholder: "Enter numbers or letters...",
    switchDisplay: "Switch Display",
    downloadImage: "Download Image",
    themes: {
      classic: "Classic Red",
      cyberpunk: "Cyberpunk",
      retro: "Retro Pop",
      minimal: "Minimal Cool",
      nature: "Nature Gradient",
      aurora: "Aurora Dream"
    },
    viewSource: "View Source on GitHub"
  },
  zh: {
    inputPlaceholder: "输入数字或字母...",
    switchDisplay: "切换显示",
    downloadImage: "下载图片",
    themes: {
      classic: "经典红色",
      cyberpunk: "赛博朋克",
      retro: "复古波普",
      minimal: "极简冷调",
      nature: "自然渐变",
      aurora: "梦幻极光"
    },
    viewSource: "查看 GitHub 源码"
  }
};

export default function Home() {
  const [input, setInput] = useState('');
  const [displayMode, setDisplayMode] = useState<'segment' | 'matrix'>('segment');
  const [theme, setTheme] = useState<'classic' | 'cyberpunk' | 'retro' | 'minimal' | 'nature' | 'aurora'>('classic');
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const displayContentRef = useRef<HTMLDivElement>(null);
  const title = 'LED-DISPLAY';

  const themes = [
    { id: 'classic' },
    { id: 'cyberpunk' },
    { id: 'retro' },
    { id: 'minimal' },
    { id: 'nature' },
    { id: 'aurora' }
  ] as const;

  const handleDownload = async () => {
    if (!displayContentRef.current) return;
    
    try {
      const container = displayContentRef.current;
      
      // 创建一个离屏容器
      const offscreenDiv = document.createElement('div');
      offscreenDiv.style.position = 'absolute';
      offscreenDiv.style.left = '-9999px';
      offscreenDiv.style.top = '0';
      offscreenDiv.style.opacity = '1';
      offscreenDiv.style.transform = 'none';
      
      // 复制原始容器的完整HTML和类名
      offscreenDiv.innerHTML = container.outerHTML;
      const clonedContainer = offscreenDiv.children[0] as HTMLElement;
      
      // 添加导出专用样式
      const exportStyle = document.createElement('style');
      exportStyle.textContent = `
        .segment:not(.active),
        .matrix-segment:not(.active) {
          opacity: 0 !important;
        }
      `;
      offscreenDiv.appendChild(exportStyle);
      
      // 确保克隆容器继承所有必要的样式
      clonedContainer.style.transform = 'none';
      clonedContainer.style.transition = 'none';
      clonedContainer.style.animation = 'none';
      clonedContainer.style.padding = '20px';
      
      // 处理所有子元素
      const processElement = (element: HTMLElement) => {
        element.style.transform = 'none';
        element.style.transition = 'none';
        element.style.animation = 'none';
        
        // 处理未激活的段码
        if ((element.classList.contains('segment') || element.classList.contains('matrix-segment')) 
            && !element.classList.contains('active')) {
          element.style.opacity = '0';
        }
        
        Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) {
            processElement(child);
          }
        });
      };
      
      processElement(clonedContainer);
      
      // 添加到文档中
      document.body.appendChild(offscreenDiv);
      
      // 等待样式应用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 获取尺寸并截图
      const canvas = await html2canvas(clonedContainer, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // 复制所有样式表
          const styles = document.getElementsByTagName('style');
          Array.from(styles).forEach(style => {
            const newStyle = clonedDoc.createElement('style');
            newStyle.textContent = style.textContent;
            clonedDoc.head.appendChild(newStyle);
          });
          
          // 复制所有link标签（外部样式表）
          const links = document.getElementsByTagName('link');
          Array.from(links).forEach(link => {
            if (link.rel === 'stylesheet') {
              const newLink = clonedDoc.createElement('link');
              newLink.rel = 'stylesheet';
              newLink.href = link.href;
              clonedDoc.head.appendChild(newLink);
            }
          });
        }
      });
      
      // 清理临时DOM
      document.body.removeChild(offscreenDiv);
      
      // 下载图片
      const link = document.createElement('a');
      link.download = `led-display-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('下载图片时出错:', error);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-12">
      <div className="fixed top-4 right-4 flex gap-4">
        <button
          onClick={toggleLanguage}
          className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 
            bg-black/20 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/40"
          title={language === 'zh' ? "Switch to English" : "切换到中文"}
        >
          <FaLanguage className="w-6 h-6" />
          <span>{language === 'zh' ? 'EN' : '中'}</span>
        </button>
        <a
          href="https://github.com/fengyukongzhou/Segment-code"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 
            bg-black/20 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/40"
          title={textContent[language].viewSource}
        >
          <FaGithub className="w-6 h-6" />
        </a>
      </div>

      <div className="title-container mb-16 animate-[float_4s_ease-in-out_infinite]">
        {title.split('').map((char, index) => (
          <div key={index} className="mx-1.5 hover:scale-110 transition-transform">
            <SegmentDisplay
              value={char}
              isTitle={true}
              colorIndex={index}
              displayMode={displayMode}
              theme={theme}
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-[95vw] mx-auto space-y-10">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-lg relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={textContent[language].inputPlaceholder}
              rows={input.includes('\n') ? 3 : 1}
              className="w-full min-w-[300px] min-h-[60px] px-6 py-4 text-lg bg-opacity-10 bg-white backdrop-blur-lg rounded-2xl 
                border border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 
                outline-none transition-all duration-300 text-white placeholder-white/50
                shadow-lg group-hover:shadow-xl resize-none"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-color/20 to-secondary-color/20 
              blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          </div>
          
          <div className="w-full overflow-x-auto rounded-2xl">
            <div ref={displayContentRef} 
              className={`min-w-full w-max ${input.includes('\n') ? 'min-h-[400px]' : 'min-h-[200px]'} flex flex-col items-center gap-6 p-10 bg-black/20 backdrop-blur-xl 
                rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500
                animate-[glow_3s_ease-in-out_infinite]`}>
              {input.split('\n').map((line, lineIndex) => (
                <div key={lineIndex} className="w-full flex flex-wrap justify-center items-start gap-6">
                  {line.split(/\s+/).filter(word => word.length > 0).map((word, wordIndex) => (
                    <div key={`${lineIndex}-${wordIndex}`} className="word-container flex justify-center items-center hover:scale-105 transition-transform">
                      <div className="inner-container flex">
                        {word.split('').map((char, charIndex) => (
                          <SegmentDisplay
                            key={charIndex}
                            value={char}
                            displayMode={displayMode}
                            theme={theme}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="flex gap-4">
            <button
              onClick={() => setDisplayMode(displayMode === 'segment' ? 'matrix' : 'segment')}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-color to-secondary-color rounded-xl 
                text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg 
                hover:shadow-xl active:scale-95 hover:translate-y-[-2px]"
            >
              <FaExchangeAlt className="text-xl" />
              <span>{textContent[language].switchDisplay}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-color to-accent-color rounded-xl 
                text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg 
                hover:shadow-xl active:scale-95 hover:translate-y-[-2px]"
            >
              <FaDownload className="text-xl" />
              <span>{textContent[language].downloadImage}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <FaPalette className="text-xl text-white/80" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as typeof theme)}
              className="px-4 py-2 bg-black/20 backdrop-blur-lg rounded-xl border border-white/20 
                text-white focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none 
                transition-all duration-300 cursor-pointer hover:border-white/40"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id} className="bg-gray-900">
                  {textContent[language].themes[t.id]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  );
}