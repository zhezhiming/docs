---
title: 主题和自定义
sidebar_position: 2
---

:::info
配置颜色、字体、密度和组件变体。
:::

在完成 [ChatKit 快速入门](/docs/ai/chatkit/) 后，了解如何更改主题并自定义聊天嵌入。通过浅色和深色主题、设置强调色、控制密度与圆角，让 ChatKit 与应用的视觉风格保持一致。

## 概览

通常通过传入一个选项对象来定制主题。如果你按照 [ChatKit 快速入门](/docs/ai/chatkit/) 在前端嵌入了 ChatKit，可使用下面的 React 语法。

- React：将 options 传给 `useChatKit({...})`

## 探索自定义选项

访问 [ChatKit Studio](https://chatkit.studio/playground) 查看 ChatKit 的实际实现与交互构建器。若你喜欢通过动手尝试来构建，这些资源是不错的起点。

## 更改主题

通过指定颜色、字体等参数匹配产品外观。下面示例切换至深色模式、更改颜色、调整圆角与信息密度，并设置字体。

更多主题选项请参阅 [ChatKit 类型定义](https://github.com/xpert-ai/chatkit-js/tree/main/packages/chatkit)：

```typescript
const options: Partial<ChatKitOptions> = {
    theme: {
        colorScheme: "dark",
        color: { 
            accent: { 
                primary: "#2D8CFF", 
                level: 2 
            }
        },
        radius: "round", 
        density: "compact",
        typography: { fontFamily: "'Inter', sans-serif" },
    },
};
```

## 自定义启动界面文本

通过修改输入框占位符，让用户了解应该提问什么或如何开始。

```typescript
const options: Partial<ChatKitOptions> = {
    composer: {
        placeholder: "Ask anything about your data…",
    },
    startScreen: {
        greeting: "Welcome to FeedbackBot!",
    },
};
```

## 为新对话提供示例提示

在会话开始时提供提示，指导用户应该询问或执行哪些操作。

```typescript
const options: Partial<ChatKitOptions> = {
    startScreen: {
        greeting: "What can I help you build today?",
        prompts: [
            { 
                name: "Check on the status of a ticket", 
                prompt: "Can you help me check on the status of a ticket?", 
                icon: "search"
            },
            { 
                name: "Create Ticket", 
                prompt: "Can you help me create a new support ticket?", 
                icon: "write"
            },
        ],
    },
};
```

## 在顶部栏添加自定义按钮

自定义顶部栏按钮可用于添加导航、上下文或与你集成相关的操作。

```typescript
const options: Partial<ChatKitOptions> = {
    header: {
        customButtonLeft: {
            icon: "settings-cog",
            onClick: () => openProfileSettings(),
        },
        customButtonRight: {
            icon: "home",
            onClick: () => openHomePage(),
        },
    },
};
```

## 启用文件附件（开发中）

附件默认关闭。若要启用，请配置附件选项。除非你使用自定义后端，否则必须使用托管上传策略。若需了解自定义后端的其他上传策略，请参阅 Python SDK 文档。

你也可以控制用户可上传文件的数量、大小与类型。

```typescript
const options: Partial<ChatKitOptions> = {
    composer: {
        attachments: {
            uploadStrategy: { type: 'hosted' },
            maxSize: 20 * 1024 * 1024, // 每个文件 20MB
            maxCount: 3,
            accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg"] },
        },
    },
}
```

## 在输入框中启用实体标签的 @ 提及（开发中）

允许用户用 @ 提及自定义“实体”，以提供更丰富的对话上下文和交互。

- 使用 `onTagSearch` 根据输入查询返回实体列表。
- 使用 `onClick` 处理实体的点击事件。

```typescript
const options: Partial<ChatKitOptions> = {
    entities: {
        async onTagSearch(query) {
            return [
                { 
                    id: "user_123", 
                    title: "Zhang san", 
                    group: "People", 
                    interactive: true, 
                },
                { 
                    id: "doc_123", 
                    title: "Quarterly Plan", 
                    group: "Documents", 
                    interactive: true, 
                },
            ]
        },
        onClick: (entity) => {
            navigateToEntity(entity.id);
        },
    },
};
```

## 自定义实体标签的展示方式（开发中）

可通过 widget 在鼠标悬停时自定义实体标签的外观。展示名片、文档摘要或图片等丰富预览内容。

```typescript
const options: Partial<ChatKitOptions> = {
    entities: {
        async onTagSearch() { /* ... */ },
        onRequestPreview: async (entity) => ({
            preview: {
                type: "Card",
                children: [
                    { type: "Text", value: `Profile: ${entity.title}` },
                    { type: "Text", value: "Role: Developer" },
                ],
            },
        }),
    },
};
```

## 为输入框添加自定义工具（开发中）

允许用户从输入框工具栏触发特定应用操作，以增强生产力。被选中的工具会作为首选工具发送给模型。

```typescript
const options: Partial<ChatKitOptions> = {
    composer: {
        tools: [
            {
                id: 'add-note',
                label: 'Add Note',
                icon: 'write',
                pinned: true,
            },
        ],
    },
};
```

## 切换 UI 区域和功能

若需要自行实现顶部栏或其他选项，可禁用主要 UI 区域与功能。当线程历史对你的使用场景（例如支持型聊天机器人）没有意义时，也可关闭历史。

```typescript
const options: Partial<ChatKitOptions> = {
    history: { enabled: false },
    header: { enabled: false },
};
```

## 覆盖语言环境

如果你的应用有统一的语言设置，可覆盖默认语言。默认情况下，语言环境使用浏览器的 locale。

```typescript
const options: Partial<ChatKitOptions> = {
    locale: 'zh-Hans',
};
```
