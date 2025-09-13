# binary-octal-hex-calc

React + Redux app to perform **Addition** and **Subtraction** for **Binary**, **Octal**, and **Hexadecimal** numbers.
Built with Vite. Uses BigInt under the hood, so it handles very large integers safely.

## Features
- Separate menus/pages: Binary, Octal, Hexadecimal
- Addition (+) and Subtraction (-) in each base
- Input validation per base (supports negative numbers)
- Results shown in the same base (Hex in uppercase)
- State preserved per page via Redux (switching pages won’t clear inputs)

## Prerequisites
- Node.js 18+ and npm

## Run locally
```bash
npm install
npm run dev
# open the printed localhost URL
```

## Project structure
```
binary-octal-hex-calc/
├─ src/
│  ├─ components/
│  │  ├─ BaseBadge.jsx
│  │  └─ CalcForm.jsx
│  ├─ pages/
│  │  ├─ BinaryPage.jsx
│  │  ├─ HexPage.jsx
│  │  └─ OctalPage.jsx
│  ├─ store/
│  │  ├─ calcSlice.js
│  │  └─ index.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ index.html
├─ vite.config.js
├─ package.json
├─ .gitignore
└─ .github/workflows/deploy.yml   # GitHub Actions deploy to Pages
```

## Git: create repo and push
Replace `YOUR_GITHUB_USERNAME` with your username (e.g. `ahmadzainuddin`).

```bash
git init
git add .
git commit -m "init: binary-octal-hex-calc"
git branch -M main

# Create a new empty repo at GitHub named: binary-octal-hex-calc
# Then add the remote:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/binary-octal-hex-calc.git

git push -u origin main
```

## Publish option A — GitHub Pages (gh-pages branch)
1) Ensure `base` is set in `vite.config.js` to `/binary-octal-hex-calc/` (it is already).
2) Install dependencies and deploy:

```bash
npm install
npm run deploy
```

This builds to `dist/` and pushes it to the `gh-pages` branch. Turn on **GitHub Pages** in your repo:
- Go to **Settings → Pages**
- Source: *Deploy from a branch*
- Branch: `gh-pages` (root)
- Save. Your site will be served at: `https://YOUR_GITHUB_USERNAME.github.io/binary-octal-hex-calc/`

## Publish option B — GitHub Actions (recommended)
This repo already includes `.github/workflows/deploy.yml`.
- In GitHub, go to **Settings → Pages** and set **Build and deployment** → *GitHub Actions*.
- Push to `main`. The action will build and publish automatically to Pages.

## Notes
- Only **integers** are supported (no fractional inputs).
- Hex output is uppercase: e.g., `1A + FF = 119` (hex).
- For very large numbers, BigInt ensures correctness.

---

Made with ❤️
