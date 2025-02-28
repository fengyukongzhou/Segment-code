import React from 'react';

interface SegmentDisplayProps {
  value: string;
  isTitle?: boolean;
  colorIndex?: number;
  displayMode?: 'segment' | 'matrix';
}

const SegmentDisplay: React.FC<SegmentDisplayProps> = ({ 
  value, 
  isTitle = false, 
  colorIndex = 0,
  displayMode = 'segment'
}) => {
  // 定义段码映射
  const segmentMaps: { [key: string]: boolean[] } = {
    '0': [true, true, true, true, true, true, false],
    '1': [false, true, true, false, false, false, false],
    '2': [true, true, false, true, true, false, true],
    '3': [true, true, true, true, false, false, true],
    '4': [false, true, true, false, false, true, true],
    '5': [true, false, true, true, false, true, true],
    '6': [true, false, true, true, true, true, true],
    '7': [true, true, true, false, false, false, false],
    '8': [true, true, true, true, true, true, true],
    '9': [true, true, true, true, false, true, true],
    'A': [true, true, true, false, true, true, true],
    'B': [false, false, true, true, true, true, true],
    'C': [true, false, false, true, true, true, false],
    'c': [false, false, false, true, true, false, true],
    'D': [false, true, true, true, true, false, true],
    'E': [true, false, false, true, true, true, true],
    'F': [true, false, false, false, true, true, true],
    'G': [true, false, true, true, true, true, false],
    'H': [false, true, true, false, true, true, true],
    'h': [false, false, true, false, true, true, true],
    'I': [false, true, true, false, false, false, false],
    'i': [true, false, true, false, false, false, false],
    'J': [false, true, true, true, true, false, false],
    'j': [true, false, true, true, false, false, false],
    'K': [false, true, true, false, true, true, true],
    'L': [false, false, false, true, true, true, false],
    'l': [false, false, false, false, true, true, false],
    'M': [true, false, true, false, true, false, false],
    'N': [false, false, true, false, true, false, true],
    'n': [false, false, true, false, true, false, true],
    'O': [true, true, true, true, true, true, false],
    'o': [false, false, true, true, true, false, true],
    'P': [true, true, false, false, true, true, true],
    'Q': [true, true, true, false, false, true, true],
    'R': [false, false, false, false, true, false, true],
    'S': [true, false, true, true, false, true, true],
    'T': [true, true, true, false, false, false, false],
    't': [false, false, false, true, true, true, true],
    'U': [false, true, true, true, true, true, false],
    'u': [false, false, true, true, true, false, false],
    'V': [false, true, true, true, true, true, false],
    'W': [false, true, false, true, false, true, false],
    'X': [false, true, true, false, true, true, true],
    'Y': [false, true, true, false, false, true, true],
    'Z': [true, true, false, true, true, false, true],
    'y': [false, true, true, true, false, true, true],
    ' ': [false, false, false, false, false, false, false],
    '-': [false, false, false, false, false, false, true]
  };

  // 定义米字形映射（16段）
  const matrixMaps: { [key: string]: boolean[] } = {
    // 数字 - 参考标准16段数码管显示
    '0': [true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false],
    '1': [false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
    '2': [true, true, true, false, true, true, true, false, true, true, false, false, false, false, false, false],
    '3': [true, true, true, true, true, true, false, false, true, true, false, false, false, false, false, false],
    '4': [false, false, true, true, false, false, false, true, true, true, false, false, false, false, false, false],
    '5': [true, true, false, true, true, true, false, true, true, true, false, false, false, false, false, false],
    '6': [true, true, false, true, true, true, true, true, true, true, false, false, false, false, false, false],
    '7': [true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
    '8': [true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    '9': [true, true, true, true, true, true, false, true, true, true, false, false, false, false, false, false],
    // 大写字母 - 参考标准16段数码管显示
    'A': [true, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false],
    'B': [true, true, true, true, true, true, false, false, false, true, false, true, false, false, true, false],
    'C': [true, true, false, false, true, true, true, true, false, false, false, false, false, false, false, false],
    'D': [true, true, true, true, true, true, false, false, false, false, false, true, false, false, true, false],
    'E': [true, true, false, false, true, true, true, true, true, true, false, false, false, false, false, false],
    'F': [true, true, false, false, false, false, true, true, true, true, false, false, false, false, false, false],
    'G': [true, true, false, true, true, true, true, true, false, true, false, false, false, false, false, false],
    'H': [false, false, true, true, false, false, true, true, true, true, false, false, false, false, false, false],
    'I': [true, true, false, false, true, true, false, false, false, false, false, true, false, false, true, false],
    'J': [true, true, false, false, true, false, true, false, false, false, false, true, false, false, true, false],
    'K': [false, false, false, false, false, false, true, true, true, false, false, false, true, true, false, false],
    'L': [false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false],
    'M': [false, false, true, true, false, false, true, true, false, false, true, false, true, false, true, false],
    'N': [false, false, true, true, false, false, true, true, false, false, true, false, false, true, false, false],
    'O': [true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false],
    'P': [true, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false],
    'Q': [true, true, true, true, true, true, true, true, false, false, false, false, false, true, false, false],
    'R': [true, true, true, false, false, false, true, true, true, true, false, false, false, true, false, false],
    'S': [true, true, false, true, true, true, false, true, true, true, false, false, false, false, false, false],
    'T': [true, true, false, false, false, false, false, false, false, false, false, true, false, false, true, false],
    'U': [false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false],
    'V': [false, false, false, false, false, false, true, true, false, false, false, false, true, false, false, true],
    'W': [false, false, true, true, false, false, true, true, false, false, false, true, false, true, false, true],
    'X': [false, false, false, false, false, false, false, false, false, false, true, false, true, true, false, true],
    'Y': [false, false, true, false, false, false, false, true, true, true, false, false, false, false, true, false],
    'Z': [true, true, false, false, true, true, false, false, false, false, false, false, true, false, false, true],
    // 小写字母 - 参考标准16段数码管显示
    'a': [true, true, true, true, true, true, true, false, true, true, false, false, false, false, false, false],
    'b': [false, false, false, true, true, true, true, true, true, true, false, false, false, false, false, false],
    'c': [false, false, false, false, true, true, true, false, true, true, false, false, false, false, false, false],
    'd': [false, false, true, true, true, true, true, false, true, true, false, false, false, false, false, false],
    'e': [true, true, true, false, true, true, true, true, true, true, false, false, false, false, false, false],
    'f': [false, true, false, false, false, false, false, false, true, true, false, true, false, false, true, false],
    'g': [true, true, true, true, true, true, false, true, true, true, false, false, false, false, false, false],
    'h': [false, false, false, true, false, false, true, true, true, true, false, false, false, false, false, false],
    'i': [true, false, false, false, true, true, false, false, true, false, false, false, false, false, true, false],
    'j': [true, true, false, true, true, true, false, false, false, false, false, false, false, false, false, false],
    'k': [false, false, false, false, false, false, true, true, true, true, false, false, false, true, false, false],
    'l': [true, false, false, false, false, true, false, false, false, false, false, true, false, false, true, false],
    'm': [false, false, false, true, false, false, true, false, true, true, false, false, false, false, true, false],
    'n': [true, true, true, true, false, false, true, true, false, false, false, false, false, false, false, false],
    'o': [false, false, false, true, true, true, true, false, true, true, false, false, false, false, false, false],
    'p': [true, true, false, false, false, false, true, true, true, false, false, false, true, false, false, false],
    'q': [true, true, true, true, false, false, false, true, true, false, false, false, true, false, false, false],
    'r': [false, false, false, false, false, false, true, false, true, true, false, false, false, false, false, false],
    's': [false, false, false, false, true, true, false, false, false, true, false, false, false, true, false, false],
    't': [false, false, false, false, false, true, false, false, true, true, false, true, false, false, true, false],
    'u': [false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false],
    'v': [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true],
    'w': [false, false, false, true, false, false, true, false, false, false, false, false, false, true, false, true],
    'x': [false, false, false, false, false, false, false, false, true, true, false, false, false, true, false, true],
    'y': [false, false, true, true, true, true, false, false, false, true, false, true, false, false, false, false],
    'z': [false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, true],
    ' ': [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    '-': [false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false]
  };

  const currentMap = displayMode === 'segment' ? segmentMaps : matrixMaps;
  // 如果小写字母没有映射，则使用其大写字母的映射
  const segments = currentMap[value] || currentMap[value.toUpperCase()] || Array(displayMode === 'segment' ? 7 : 16).fill(false);

  // 如果是空格，返回一个占位符
  if (value === ' ') {
    return <div className="segment-display" />;
  }

  const titleClass = isTitle ? `title-segment color-${colorIndex}` : '';

  return (
    <div className={`segment-display ${displayMode === 'matrix' ? 'matrix-mode' : ''}`}>
      {displayMode === 'segment' ? (
        <>
          <div className={`segment segment-a ${segments[0] ? `active ${titleClass}` : ''}`} />
          <div className={`segment segment-b ${segments[1] ? `active ${titleClass}` : ''}`} />
          <div className={`segment segment-c ${segments[2] ? `active ${titleClass}` : ''}`} />
          <div className={`segment segment-d ${segments[3] ? `active ${titleClass}` : ''}`} />
          <div className={`segment segment-e ${segments[4] ? `active ${titleClass}` : ''}`} />
          <div className={`segment segment-f ${segments[5] ? `active ${titleClass}` : ''}`} />
          <div className={`segment segment-g ${segments[6] ? `active ${titleClass}` : ''}`} />
        </>
      ) : (
        <>
          {/* 外层矩形 */}
          {/* 上横线(A1、A2) */}
          <div className={`matrix-segment matrix-a1 ${segments[0] ? `active ${titleClass}` : ''}`} />
          <div className={`matrix-segment matrix-a2 ${segments[1] ? `active ${titleClass}` : ''}`} />
          {/* 右竖线(B、C) */}
          <div className={`matrix-segment matrix-b ${segments[2] ? `active ${titleClass}` : ''}`} />
          <div className={`matrix-segment matrix-c ${segments[3] ? `active ${titleClass}` : ''}`} />
          {/* 下横线(D1、D2) */}
          <div className={`matrix-segment matrix-d1 ${segments[4] ? `active ${titleClass}` : ''}`} />
          <div className={`matrix-segment matrix-d2 ${segments[5] ? `active ${titleClass}` : ''}`} />
          {/* 左竖线(E、F，从下到上) */}
          <div className={`matrix-segment matrix-e ${segments[6] ? `active ${titleClass}` : ''}`} />
          <div className={`matrix-segment matrix-f ${segments[7] ? `active ${titleClass}` : ''}`} />
          {/* 中间横线(G1、G2) */}
          <div className={`matrix-segment matrix-g1 ${segments[8] ? `active ${titleClass}` : ''}`} />
          <div className={`matrix-segment matrix-g2 ${segments[9] ? `active ${titleClass}` : ''}`} />
          {/* 左上到中间(H) */}
          <div className={`matrix-segment matrix-h ${segments[10] ? `active ${titleClass}` : ''}`} />
          {/* 正上到中间(J) */}
          <div className={`matrix-segment matrix-j ${segments[11] ? `active ${titleClass}` : ''}`} />
          {/* 右上到中间(K) */}
          <div className={`matrix-segment matrix-k ${segments[12] ? `active ${titleClass}` : ''}`} />
          {/* 右下到中间(L) */}
          <div className={`matrix-segment matrix-l ${segments[13] ? `active ${titleClass}` : ''}`} />
          {/* 正下到中间(M) */}
          <div className={`matrix-segment matrix-m ${segments[14] ? `active ${titleClass}` : ''}`} />
          {/* 左下到中间(N) */}
          <div className={`matrix-segment matrix-n ${segments[15] ? `active ${titleClass}` : ''}`} />
        </>
      )}
    </div>
  );
};

export default SegmentDisplay;