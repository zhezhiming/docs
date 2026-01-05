---
title: Actions
sidebar_position: 6
---


:::warning In development
:::

:::info
Trigger backend actions based on user interactions in chat.
:::

Actions let the ChatKit SDK frontend trigger streaming responses before a user submits a message and can also trigger side effects outside ChatKit.

## Trigger actions

### Respond to widget interactions

Attach an `ActionConfig` to supported widget nodes to fire actions. For example, react to a button click: when the user clicks the button, the action payload is sent to your server, where you can update widgets, run reasoning, or stream new thread entries.
