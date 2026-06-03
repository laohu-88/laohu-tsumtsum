# laohu-tsumtsum 🐯

> 基于 TypeScript + Canvas 打造的迪士尼 Tsum Tsum 消除游戏。  
> A Disney Tsum Tsum-style match-and-clear game built with TypeScript and Canvas.

## 项目简介 | Overview

**laohu-tsumtsum 🐯** 是一个面向 Web 的休闲消除游戏项目，核心玩法围绕可爱的 Tsum 角色、自然的物理掉落、拖拽连线与连线消除展开。项目目标是在浏览器中复刻轻快、顺滑、富有反馈感的 Tsum Tsum 游戏体验。

**laohu-tsumtsum 🐯** is a web-based casual puzzle game focused on adorable Tsum characters, natural physics-driven falling, drag-to-connect interactions, and satisfying chain clears. The goal is to deliver a smooth, responsive, and playful Tsum Tsum-style experience directly in the browser.

## 核心特性 | Core Features

- **物理掉落 | Physics-based falling**  
  Tsum 角色会在 Canvas 场景中自然下落、堆叠与碰撞，形成动态棋盘状态。

- **连线消除 | Link-and-clear matching**  
  玩家可以拖拽连接相同角色，形成有效链路后触发消除、得分与反馈效果。

- **Canvas 渲染 | Canvas rendering**  
  使用 Canvas 绘制角色、轨迹、特效和游戏状态，适合高频动画与移动端体验。

- **可扩展角色配置 | Extensible character data**  
  角色资源、对齐参数和游戏配置可持续扩展，方便快速加入新的 Tsum 角色。

- **PWA 友好 | PWA-ready direction**  
  项目包含面向离线体验和移动端安装的基础结构，可继续扩展为完整 PWA。

## 技术栈 | Tech Stack

- **TypeScript** - 严格类型约束与可维护的游戏逻辑
- **Canvas 2D** - 高频渲染、连线轨迹、角色与特效绘制
- **HTML / CSS** - 页面结构、响应式布局与移动端适配
- **npm** - 本地依赖管理与开发脚本
- **OpenAI Codex** - AI 辅助开发、重构、测试与文档生成

## 快速本地运行 | Quick Start

```bash
npm install
npm run dev
```

运行后在浏览器中打开终端提示的本地地址。  
After starting the dev server, open the local URL shown in your terminal.

## AI 辅助开发 | AI-Driven Development

本项目深度结合 **OpenAI Codex** 进行开发协作。Codex 可用于梳理游戏架构、重构物理与渲染循环、生成角色配置、优化 Canvas 性能、完善文档，并在迭代过程中帮助检查潜在的类型、状态和动画问题。

This project is deeply integrated with **OpenAI Codex** as an AI development partner. Codex helps with game architecture, physics and rendering refactors, character configuration, Canvas performance optimization, documentation, and iterative review of type safety, state management, and animation behavior.

## 开发原则 | Development Principles

- 保持物理更新、碰撞检测与渲染绘制之间的职责清晰。
- 使用严格类型，避免隐式状态和不可控副作用。
- 优先优化主循环、对象分配、Canvas 绘制批次和移动端交互延迟。
- 为新增角色、资源与玩法规则保留清晰的数据入口。

- Keep physics updates, collision detection, and rendering responsibilities clearly separated.
- Use strict typing and avoid hidden mutable state or uncontrolled side effects.
- Prioritize optimization around the main loop, object allocation, Canvas draw batches, and mobile input latency.
- Keep character, asset, and rule additions data-driven whenever possible.

## 许可证 | License

本项目使用 MIT License。详见 [LICENSE](./LICENSE)。  
This project is released under the MIT License. See [LICENSE](./LICENSE).
