# 霓虹段码显示器 (LED Display)

[English](./README_EN.md) | 简体中文

一个基于 Next.js 和 React 开发的现代化段码显示器，具有霓虹灯效果和渐变色标题。支持7段码和16段码两种显示模式。

🔗 在线演示：[https://segment-code.vercel.app/](https://segment-code.vercel.app/)

![LED Display Demo](demo.gif)

## 功能特点

- 🌈 渐变色标题动画效果
- 💡 霓虹灯发光效果
- ⌨️ 实时段码显示
- 🎯 支持数字和字母输入
- 🔄 支持7段码和16段码切换
- 💾 支持下载段码图片
- 🎨 现代化 UI 界面

## 技术栈

- **前端框架**：
  - Next.js 14.1.0
  - React 18.2.0
  - TypeScript

- **样式解决方案**：
  - Tailwind CSS
  - CSS3 动画
  - CSS 自定义属性 (CSS Variables)

- **特色技术**：
  - CSS Grid/Flexbox 布局
  - CSS 动画和过渡效果
  - TypeScript 类型系统
  - React Hooks
  - 组件化开发
  - HTML5 Canvas (用于图片导出)

## 项目结构

```
segment-code/
├── app/
│   ├── components/
│   │   └── SegmentDisplay.tsx    # 段码显示组件
│   ├── styles/
│   │   └── SegmentDisplay.css    # 段码样式
│   ├── layout.tsx               # 布局组件
│   └── page.tsx                 # 主页面
├── package.json
├── tsconfig.json
└── README.md
```

## 本地开发

1. 克隆项目
```bash
git clone [repository-url]
cd segment-code
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 使用说明

1. **输入文字**：在输入框中输入数字或字母
2. **切换显示模式**：点击右下角的切换按钮，可在7段码和16段码之间切换
3. **下载图片**：点击下载按钮，可将当前显示的段码保存为PNG图片
4. **多单词显示**：可以使用空格分隔不同的单词

## 实现细节

### 段码显示

- 使用 CSS Grid 实现段码布局
- 通过 CSS 变量实现动态颜色控制
- 使用 box-shadow 实现霓虹灯发光效果
- 支持7段码和16段码两种显示模式
- 实现了完整的字母和数字映射

### 动画效果

- 标题浮动动画
- 霓虹灯闪烁效果
- 渐变色过渡
- 平滑的状态转换
- 按钮交互动画

### 图片导出

- 使用 html2canvas 实现段码图片导出
- 支持透明背景
- 高清图片输出（2x 缩放）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License

## 致谢

- Next.js 团队
- React 社区
- Tailwind CSS 团队
- html2canvas 项目 