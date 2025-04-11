# 🧮 Causal Formula Input Clone

This project replicates the **formula input functionality** from [Causal](https://www.causal.app), as part of a Frontend Developer Test.

Built with **React**, **Zustand**, **React Query**, and **Tailwind CSS**, it allows users to build expressions using variables, operators, and autocomplete tokens — mimicking a spreadsheet/code-editor hybrid input.

## 📺 Demo

Live preview: [lucidcasual.vercel.app](lucidcasual.vercel.app)

## 🔧 Features

- ✅ **Tag & Operator Parsing**  
  Supports natural numbers, mathematical operators, and tagged tokens.

- ✅ **Autocomplete Suggestions**  
  Pulls from a mock API and suggests based on user input.

- ✅ **Interactive Tags with Dropdowns**  
  Each inserted token (variable) has a dropdown for additional actions.

- ✅ **Keyboard Navigation**  
  Use arrow keys to navigate suggestions and `Enter` to select.

- ✅ **Backspace Deletion**  
  Easily remove the last token when input is empty.

- ✅ **Formula Evaluation (Bonus)**  
  Dummy values are used to evaluate the formula and return a result.

## 🧪 Tech Stack

- ⚛️ React
- 💅 Tailwind CSS
- 🌐 React Query
- 🧠 Zustand
- 📦 MockAPI for autocomplete:  
  `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`

## 📹 Reference Video

This feature replicates the formula input UI/UX from Causal.  
Watch the reference video here: [Video Walkthrough ](https://www.awesomescreenshot.com/video/38658633?key=613b71ec01c462fbc8e09aae6f2273a4)

## 🏁 Getting Started

Clone and run locally:

```bash
git clone insert-repo-name
cd repo-name
npm install
npm run dev
