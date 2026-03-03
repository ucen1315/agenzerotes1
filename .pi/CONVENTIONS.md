# 🏗️ Arsitektur Modular - testbikinweb1

## 📁 Struktur Folder

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Primitive components (Button, Input, Card, Badge)
│   ├── layout/         # Layout components (Sidebar, Topbar)
│   ├── dashboard/      # Dashboard-specific components
│   ├── market/         # Market page components
│   └── security/       # Security page components
├── pages/              # Page-level components
│   ├── Dashboard/
│   ├── Market/
│   └── Security/
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🧩 Modular Principles

### 1. Component Structure
- Setiap component dalam folder sendiri jika memiliki sub-components
- Gunakan barrel exports (index.ts) untuk clean imports
- Pisahkan logic ke custom hooks

### 2. Naming Convention
- Components: PascalCase (e.g., `PortfolioValue.tsx`)
- Hooks: camelCase dengan prefix `use` (e.g., `useFormatCurrency.ts`)
- Utilities: camelCase (e.g., `utils.ts`)
- Types: PascalCase dengan suffix jika perlu (e.g., `UserData`, `ApiResponse`)

### 3. Import Pattern
```typescript
// Absolute imports untuk project modules
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import type { User } from '@/types';
```

### 4. State Management
- Global state: Zustand store
- Local state: useState/useReducer
- Server state: React Query (rekomendasi) atau service layer

### 5. Styling
- Tailwind CSS dengan className utilities
- Gunakan `cn()` utility dari lib/utils untuk conditional classes
- Konsisten dengan design system yang ada

## 🛠️ Tools Configuration

### TypeScript Path Mapping (tsconfig.json)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vite Config
Sudah terkonfigurasi dengan `@` alias ke `src/` folder.
