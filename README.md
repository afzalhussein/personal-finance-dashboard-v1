# Personal-Finance-Dashboard
Starter project
Here’s a ready-to-go GitHub template for your **Personal Finance Dashboard** starter project. You can fork this structure into your own repo (then hit **“Use this template”** on GitHub) and start coding immediately.

---

## 📁 Repository Structure

```
personal-finance-dashboard/
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── pages/
│   ├── api/
│   │   └── transactions.js      ← Mock API routes
│   └── index.js                 ← Dashboard UI
├── components/
│   ├── Chart.js                 ← Reusable Chart.js wrapper
│   └── TransactionList.js       ← Transaction table + filters
├── styles/
│   └── globals.css              ← Tailwind base imports
└── .gitlab-ci.yml
```

---

### 1. **.gitignore**

```
node_modules/
.next/
.env.local
.DS_Store
```

---

### 2. **package.json**
```json
{
  "name": "personal-finance-dashboard",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "chart.js": "^4.0.0",
    "next": "13.x",
    "react": "18.x",
    "react-dom": "18.x",
    "tailwindcss": "^3.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```
---

### 3. **tailwind.config.js**
```js
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```
---

### 4. **postcss.config.js**
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
---

### 5. **next.config.js**

*(Enable any custom settings here)*

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

---

### 6. **pages/api/transactions.js**

*(Mock CRUD API; replace with real DB later)*

```js
let transactions = [
  { id: 1, date: "2025-06-15", category: "Groceries", amount: 85 },
  { id: 2, date: "2025-06-20", category: "Rent", amount: 1200 },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    const newTx = { id: Date.now(), ...req.body };
    transactions.push(newTx);
    res.status(201).json(newTx);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

---

### 7. **pages/index.js**

```jsx
import Head from "next/head";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Finance Dashboard</title>
      </Head>
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Personal Finance Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-4 shadow rounded">
            <h2 className="font-medium mb-2">Monthly Spending</h2>
            <Chart />
          </div>
          <div className="card p-4 shadow rounded">
            <h2 className="font-medium mb-2">Transactions</h2>
            <TransactionList />
          </div>
        </div>
      </main>
    </>
  );
}
```

---

### 8. **components/Chart.js**

```jsx
import { useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";

export default function Chart() {
  const canvasRef = useRef();
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Rent", "Groceries", "Utilities", "Entertainment"],
        datasets: [{ label: "Amount", data: [1200, 350, 150, 200] }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
```

---

### 9. **components/TransactionList.js**

```jsx
import { useEffect, useState } from "react";

export default function TransactionList() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((r) => r.json())
      .then(setTxs);
  }, []);

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Category</th>
          <th className="p-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {txs.map((t) => (
          <tr key={t.id}>
            <td className="p-2">{t.date}</td>
            <td className="p-2">{t.category}</td>
            <td className="p-2">${t.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

### 10. **.gitlab-ci.yml**

```yaml
image: node:18

stages:
  - install
  - build
  - deploy

cache:
  paths:
    - node_modules/

install:
  stage: install
  script:
    - npm ci

build:
  stage: build
  script:
    - npm run build

deploy:
  stage: deploy
  script:
    - echo "👉 Add your deploy commands here (e.g., docker build & push)"
  only:
    - main
```

---

## 🚀 Getting Started

1. **Clone as template**
   On GitHub, click **“Use this template”** and clone it locally:

   ```bash
   git clone git@github.com:<you>/personal-finance-dashboard.git
   cd personal-finance-dashboard
   ```

2. **Install & run**

   ```bash
   npm install
   npm run dev
   ```

3. **Visit** `http://localhost:3000` and start customizing!

---

This template sets up a clean, **Next.js + Tailwind + Chart.js** foundation with a mock API and **GitLab CI/CD**. From here you can:

* Swap the mock `/api/transactions` for a real database
* Add authentication via `next-auth`
* Extend charts, add dark mode, export features, tests, etc.

Feel free to tweak and make it your own!
