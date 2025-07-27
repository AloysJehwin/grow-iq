# GrowIQ Farm Dashboard

GrowIQ is a real-time farm IoT dashboard built with **Next.js (TypeScript, App Router)** and **TailwindCSS**. It empowers farmers with live insights for smarter, sustainable farm management.

---

## Vision

Provide farmers real-time IoT data visualization to improve decisions, optimize resources, and boost productivity through an intuitive web dashboard.

---

## Setup & Installation

1. **Create Next.js project** with `/src` directory and TypeScript:

```bash
npx create-next-app@latest growiq-dashboard -ts --src-dir
cd growiq-dashboard
```

2. **Install TailwindCSS**:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure** `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

4. **Add Tailwind directives** to `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional glassmorphic style */
.glassmorphic {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.13);
}
```

5. **Run the development server**:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## Features

* Live farm data from IoT sensors (soil moisture, temperature, humidity, growth progress)
* Responsive, clean UI with progress bars and alerts
* Field-wise detailed cards and timeline instructions
* Easily extensible for charts, filters, and modals

---

## Project Structure Overview

```
growiq-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx       # Main dashboard (Client Component)
│   │   └── globals.css    # Tailwind + custom styles
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Support

Open an issue for help or feature requests.

---

## License

MIT License

---

Thanks for using GrowIQ!
