# 🚀 UI CORE KIT    

A lightweight React UI component library providing only the core building blocks you need—nothing more, nothing less.

Unlike bloated UI kits, **ui-core-kit** focuses on essentials: reusable, accessible, and customizable components to help you build faster without enforcing strict design systems.

---

## ✨ Features

- ⚡ **Core-Only Components** — No unnecessary extras, just what you need.
- 🎨 **Customizable** — Style with Tailwind CSS or your own design system.
- 📦 **Tree-Shakable** — Import only the components you use.
- 🛠 **TypeScript Ready** — Full type safety for better DX.
- 🌍 **Open Source** — Community-driven, contributions welcome.

---

## 📦 Installation

```bash
npm install ui-core-kit
# or
yarn add ui-core-kit
# or
pnpm add ui-core-kit
```

---

## 🚀 Usage Example

```jsx
import { Button, Card } from "ui-core-kit";

export default function App() {
    return (
        <Card>
            <h2>Hello Blaze!</h2>
            <Button onClick={() => alert("Clicked!")}>Click Me</Button>
        </Card>
    );
}
```

---

## 📖 Available Components

- ✅ **Button**
- ✅ **Card**
- ✅ **Input**
- ✅ **Modal**
- ✅ **Avatar**
- ✅ **DataTable (server-side/manual pagination settings)**
- ✅ **Toast**
- ✅ **Notification**
- ✅ **Dialog**
- ✅ **Tooltip**
- ✅ **DatePicker**
- ✅ **Dropdown**
- ✅ **Chart**

_More components will be added by the community!_

---

## 🛠 Development

Clone the repo:

```bash
git clone https://github.com/samuel-adedigba/ui-core-kit-monorepo.git
cd ui-core-kit-monorepo
npm install
```

Run in dev mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🎬 Making Demos

We encourage developers and designers to showcase real-world use cases!

1. **Fork** this repo.
2. **Create** a folder inside `/examples/your-demo-name`.
3. **Build** a small React app using components from `ui-core-kit`.
4. **Submit** a PR with your demo.

➡️ _Demos will be featured in the documentation to inspire others!_

---

## 🤝 Contributing

We welcome contributions! Here’s how you can help:

1. **Fork** the repo.
2. **Create a branch:**
     ```bash
     git checkout -b feature/add-new-component
     ```
3. **Add** your component (or fix a bug).
4. **Write** tests and documentation.
5. **Submit** a Pull Request.

**Contribution Guidelines:**

- Keep components small and composable.
- Use TypeScript + React.
- Support custom `className` / styling props.
- Follow existing folder & file structure.

---

## 🗺 Roadmap

- [ ] Add form components (Select, Checkbox, Radio)
- [ ] Add layout helpers (Grid, Flex)
- [ ] Add accessibility improvements (ARIA support)
- [ ] Build a Storybook playground for demos
- [ ] Publish official docs site

---

## 📜 License

MIT © [Your Name]

---

## 🌟 Call for Community

**ui-core-kit** is open source and thrives with community input.  
If you’re building with it—share your demos, ideas, and feedback.  
Together we can shape a lean, modern UI library for everyone.