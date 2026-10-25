export interface ErrorPayload {
  errorName: string;
  message: string;
  stack: string;
  environment: string;
  url: string;
  userId?: string;
  timestamp: string;
}

export class BurgerFormatter {
  public static generateIssueTitle(payload: ErrorPayload): string {
    return `🍔 [🚨 \${payload.environment.toUpperCase()}] payload.errorName: {payload.message}`;
  }

  public static generateMarkdownBody(payload: ErrorPayload): string {
    return `
# 🍔 THE DEBUG BURGER ORDER RECIEPT
A new messy ingredient just dropped into production. Time to cook a fix!

```text
       .-------------.
      (   THE DEBUG   )  <- [\${payload.environment.toUpperCase()}] CRASH DETECTED
       '-------------'
          \\ (x_x) /      <- \${payload.errorName}
       ================  <- CRITICAL STACK TRACE INSIDE
       [-------------]   <- OPENED VIA THE-DEBUG-BURGER
       '-------------'
```

## 📋 Order Summary (Error Details)
* **Status:** 🛑 Kitchen Fire (Uncaught Exception)
* **Timestamp:** \`${payload.timestamp}\`
* **Environment:** \`${payload.environment}\`
* **Affected URL:** [Click to view context](${payload.url})
* **Customer Affected (User ID):** \`${payload.userId || 'Anonymous Guest'}\`

---

## 🍞 Top Bun: Error Context
> **${payload.errorName}**
> \`${payload.message}\`

---

## 🥩 The Rotten Meat: Stack Trace
Look at this ugly meat layer. This is where the code got poisoned:

\`\`\`sh
${payload.stack}
\`\`\`

---

## 🍅 Pickles & Seasoning: Request Metadata

| Ingredient | Value |
| :--- | :--- |
| **Server Engine** | Node.js v20.x |
| **Alert Trigger** | The Debug Burger Webhook |
| **Suggested Action** | Check the stack trace, reproduce locally, wrap in a \`try/catch\` basket. |

---
_Generated automatically by **The Debug Burger Bot**. Go wash your hands before refactoring._
`;
  }
}
