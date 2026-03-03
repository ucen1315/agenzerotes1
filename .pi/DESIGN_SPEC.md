# 🎨 Modern Design Specification - Crypto Dashboard

## Design System

### Color Palette (Dark Modern)
```
--bg-primary: #0a0a0f       (Near black)
--bg-secondary: #12121a     (Dark navy)
--bg-tertiary: #1a1a25      (Card background)
--bg-glass: rgba(26, 26, 37, 0.8)  (Glassmorphism)
--accent-primary: #6366f1   (Indigo)
--accent-secondary: #8b5cf6 (Purple)
--accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6)
--text-primary: #ffffff
--text-secondary: #94a3b8
--text-muted: #64748b
--success: #10b981
--danger: #ef4444
--warning: #f59e0b
--border: rgba(255, 255, 255, 0.1)
```

### Typography
- Primary: Inter, system-ui
- Headings: font-weight 700, tracking-tight
- Body: font-weight 400, line-height 1.6
- Monospace: JetBrains Mono (for numbers/prices)

### Effects
- Glassmorphism: backdrop-blur(12px), bg-opacity 0.8
- Gradients: Subtle purple-indigo gradients
- Shadows: Large diffused shadows with glow effects
- Border radius: 16px for cards, 12px for buttons, full for pills
- Transitions: 200ms ease-out

### Spacing
- Cards padding: 24px
- Section gaps: 32px
- Grid gaps: 24px

## Component Styles

### Cards
- Background: bg-tertiary with glassmorphism
- Border: 1px solid border
- Border-radius: 16px
- Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
- Hover: Subtle lift with glow

### Buttons
- Primary: Gradient background, white text, rounded-xl
- Secondary: Transparent with border, hover fills
- Ghost: No background, text only with hover state

### Inputs
- Dark background with subtle border
- Focus: Accent color glow
- Placeholder: Muted text

### Tables
- Dark rows with subtle borders
- Hover highlight
- Sticky header with blur

### Badges
- Pill shape (rounded-full)
- Status colors with glow
- Small text, bold

## Layout Principles
- Full dark theme (no light mode needed)
- Sidebar: Dark glass, compact
- Content: Generous whitespace
- Responsive: Mobile-first, collapsible sidebar
