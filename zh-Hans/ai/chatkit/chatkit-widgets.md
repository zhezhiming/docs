---
title: 小部件
sidebar_position: 3
---

:::tip PRO
此功能在**专业版**中支持。
:::

:::info
了解如何在聊天体验中设计小部件。
:::

小部件是 ChatKit 提供的容器和组件。你可以使用预构建的小部件、修改模板或自行设计，以便在产品中完全自定义 ChatKit。

<figure className="Large">
  <img src="/img/ai/chatkit/a2ui_gallery_examples.png" alt="ChatKit Widgets" className="shadow-lg rounded-xl" />
  <figcaption>ChatKit 小部件示例</figcaption>
</figure>

## 快速设计小部件

在 [A2UI Widget Builder](https://go.copilotkit.ai/A2UI-widget-builder) 中使用小部件生成器试验卡片布局、列表行，并预览组件。完成满意的设计后，将生成的 JSON 复制到你的集成中，并从后端提供服务。

## 小部件中间件

通过中间件配置，你可以让大模型通过工具调用或者结构化输出的方式返回 ChatKit 小部件给前端展示数据。使用中间件来动态更改小部件内容、样式或行为，以适应用户上下文或偏好。

<figure className="Large">
  <img src="/img/ai/chatkit/chatkit-widgets-middleware.png" alt="Widgets Middleware" className="shadow-lg rounded-xl" />
  <figcaption>ChatKit 小部件中间件配置</figcaption>
</figure>

ChatKit 小部件可以在对话中直接呈现上下文、快捷方式和交互式卡片。当用户点击小部件按钮时，你的应用会收到自定义操作负载，以便你的后端做出响应。

## 在服务器上处理操作

小部件操作允许用户从 UI 触发逻辑。操作可以绑定到不同小部件节点上的事件（例如按钮点击），然后由服务器或客户端集成处理。

使用 WidgetsOption 的 onAction 回调或等效的 React 钩子捕获小部件事件。将操作负载转发到后端以处理这些操作。

```typescript
chatkit.setOptions({
    widgets: {
        async onAction(action, item) {
            await fetch('/api/widget-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, itemId: item.id }),
            });
        },
    },
});
```

## 总结

ChatKit 小部件为你的聊天应用提供了丰富的交互和展示选项。通过使用预构建的小部件、设计自定义组件以及利用中间件和操作处理，你可以创建高度个性化和动态的用户体验。

了解更多关于 [A2UI 协议](https://a2ui.org/) 的信息。
