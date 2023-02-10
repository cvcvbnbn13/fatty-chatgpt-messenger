# Fatty-ChatGPT-Messenger

A Funny Repo using **TypeScript & React(Next.js)** , css framework **Tailwindcss**, Database **Firebase** , deploy by **Vercel**.

網站連結：[Fatty-ChatGPT-Messenger](https://fatty-chatgpt-messanger.vercel.app/)

### 目錄

- [專案簡介](#專案簡介)
- [目錄結構說明](#目錄結構說明)
- [第三方套件使用](#第三方套件使用)

## 專案簡介

```
適逢ChatGPT熱潮，試做看看。

由於ChatGPT對中文支援不高，
中文提問無法回答或是回答時間過長都是極有可能發生，
建議以英文提問。
```

---

## 目錄結構說明

1. components

   - Chat

   - ChatInput

   - ChatRow

   - NewChat

   - ClientProvider

   - SessionProvider

   - Login

   - ModelSelection

   - SideBar

   - index.js

2. app

   - chat
     - [id]
       - page.tsx
   - head.tsx
   - layout.tsx
   - page.tsx

3. pages

- auth

  - [...nextauth].ts

- api

  - askQuestion.ts

  - getEngines.ts

- \_app.tsx

4. public

5. styles

6. libs

   - chatgpt.ts

   - quertApi.ts

   - index.ts

7. types.d.ts

8. .env.local

9. package.json

10. tailwind.config.js

11. tsconfig.json

12. next.config.js

13. firebase.ts

14. firebaseAdmin.ts

---

## 第三方套件使用

- heroicons
- react-hot-toast
  - function for notification
- openai
- react-select
  - custom selectBar
- react-firebase-hooks
- swr

---

## 🚀 如何執行

### Dev Server Guide

1. Clone the project from [Fatty-ChatGPT-Messenger](https://github.com/cvcvbnbn13/fatty-chatgpt-messenger)
   .
2. Move the root path in project folder.
3. Run `npm i` or `npm install` to install node_modules.
4. The default server is on `localhost:3000`, please check you don't have any server on it.
5. Run `npm run dev` to start dev server.

Steps

```git bash
git clone https://github.com/cvcvbnbn13/fatty-chatgpt-messenger
cd fatty-chatgpt-messenger
npm install && npm audit fix
npm run dev
```

+-
