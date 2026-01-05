---
title: 客户端工具
sidebar_position: 4
---

:::info
了解如何定义工具让智能体操作客户端功能。
:::

客户端工具用于将**模型发起的工具调用路由到前端 UI 执行**，并将执行结果返回给模型继续推理，适用于读取前端状态、用户交互、浏览器能力等场景。

<figure className="Large">
  <img src="/img/ai/chatkit/client-tool-middleware.png" alt="Client tool middleware" className="shadow-sm rounded-xl" />
  <figcaption>客户端工具中间件</figcaption>
</figure>

## 工作流程

1. **服务端配置 Client Tool**

   * 在工作流中使用 **Client Tool 中间件**
   * 定义 `Tool Name / Description / Arguments Schema`

2. **模型触发工具调用**

   * LLM 根据上下文调用指定 Client Tool

3. **前端接收并执行**

   * ChatKit 通过 `onClientTool` 将调用消息发送到前端
   * 前端执行真实逻辑（UI / 本地状态）

4. **返回结果**

   * 前端返回 tool result
   * ChatKit 将结果回传给模型，继续生成回复

---

## 服务端配置要点

**Tool Name**

* 唯一标识，如：`get_current_station`
* 必须与前端代码中的 `name` 完全一致

**Arguments Schema**

参数模式配置需符合 [JSON Schema 规范](https://json-schema.org/learn/getting-started-step-by-step)：

```json
{
  "type": "object",
  "properties": {}
}
```

---

## 前端（React）接入

在 `useChatKit` 中注册 `onClientTool`：

```ts
const handleClientTool = async ({ name, tool_call_id, id }) => {
  if (name === 'get_current_station') {
    return {
      tool_call_id: tool_call_id || id,
      name,
      status: 'success',
      content: JSON.stringify({ /* tool result */ }),
    };
  }
};
```

```ts
useChatKit({
  ...
  onClientTool: handleClientTool,
});
```

---

## 返回结果格式

* `tool_call_id`：必须回填
* `status`：`success` 或 `error`
* `content`：字符串（推荐 JSON）

```json
{
  "nodes": [...],
}
```

---

## 最佳实践

* Tool Name 强一致（服务端 = 前端）
* 使用 `useRef` 读取最新 UI 状态，避免闭包问题
* `content` 尽量精简，避免返回大对象
* 失败场景使用 `status: "error"` 明确返回

---

客户端工具让 ChatKit 能安全、可控地与前端状态和用户交互集成，是实现 **HITL（Human-in-the-loop）** 与 **UI 感知智能体** 的关键能力。
