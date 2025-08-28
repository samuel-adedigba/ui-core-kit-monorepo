
---

### 📌 `docs/examples.md`
```markdown
# 🔥 Examples

Some real-world usage of **Blaze React UI Core**.

---

## ✅ Buttons

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

```

import { Button } from "ui-core-kit"

function HomePage() {
  return (
    <div className="p-6">
      <Button variant="primary">Get Started</Button>
    </div>
  )
}

export default HomePage
