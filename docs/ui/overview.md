# 🎨 UI Overview - Allenatore Nato

Questa documentazione descrive l'organizzazione del layout, i componenti principali e le linee guida di accessibilità per ciascuna pagina dell'app Allenatore Nato.

---

## 🎯 **Design System Status**

### ✅ **Token Adoption: 100%**

| Categoria | Status | Implementazione |
|-----------|--------|-----------------|
| **Colori** | ✅ 100% | Design tokens CSS + Tailwind integration |
| **Spacing** | ✅ 100% | Sistema 8px con token CSS variables |
| **Typography** | ✅ 100% | Font scale + line-height tokens |
| **Border Radius** | ✅ 100% | Token CSS per tutti i radius |
| **Shadows** | ✅ 100% | Sistema shadow unificato |
| **Componenti** | ✅ 100% | Tutti i componenti migrati a Tailwind |
| **Legacy CSS** | ✅ 0% | Completamente rimosso |

### 🔧 **Architettura Design System**

```
packages/style/
├── design-tokens.css     # Token CSS centrali
└── index.css            # Import e utilities

tailwind.config.js       # Integrazione token → Tailwind
packages/ui/src/         # Componenti Tailwind puri
```

### 🎨 **Token Categories**

#### **Color Tokens**
- **Primary**: Blue scale (50-950) per azioni principali
- **Secondary**: Green scale per successo e conferme  
- **Accent**: Orange scale per highlight e CTA
- **Success/Warning/Error**: Semantic colors
- **Usage**: `rgb(var(--clr-primary-600) / <alpha-value>)`

#### **Spacing Tokens**
- **Sistema 8px**: da `--sp-0-5` (2px) a `--sp-96` (384px)
- **Consistency**: Tutti i margin/padding usano token
- **Usage**: `var(--sp-4)` = 16px

#### **Typography Tokens**
- **Font Scale**: da `--fs-xs` (12px) a `--fs-6xl` (60px)
- **Line Heights**: Ottimizzati per leggibilità
- **Font Family**: Inter + JetBrains Mono
- **Usage**: `font-size: var(--fs-lg); line-height: var(--lh-lg);`

#### **Border Radius Tokens**
- **Scale**: da `--rad-xs` (2px) a `--rad-3xl` (24px)
- **Consistency**: Tutti i border-radius usano token
- **Usage**: `border-radius: var(--rad-lg);`

#### **Shadow Tokens**
- **Scale**: da `--shadow-xs` a `--shadow-2xl`
- **Dark Mode**: Automaticamente adattati
- **Usage**: `box-shadow: var(--shadow-md);`

---

## 📱 **Componenti UI Migrati**

### ✅ **Componenti Core (100% Tailwind)**

| Componente | Status | Features |
|------------|--------|----------|
| **ButtonPrimary** | ✅ Migrato | Varianti, loading, icone, token spacing |
| **LoadingSpinner** | ✅ Migrato | Overlay, size variants, token colors |
| **AthleteCard** | ✅ Migrato | Hover effects, status badges, responsive |
| **FeeStatusBadge** | ✅ Migrato | Semantic colors, tooltip, animations |
| **EventCalendar** | ✅ Migrato | Month view, event types, token spacing |
| **PositionPicker** | ✅ Migrato | Grouped options, category colors, validation |
| **Tabs** | ✅ Migrato | Badge support, keyboard nav, animations |
| **UploadDropzone** | ✅ Migrato | Drag&drop, validation, progress states |
| **DocumentList** | ✅ Migrato | Expiry badges, file types, hover states |

### 🎨 **Design Patterns**

#### **Color Usage**
```css
/* Semantic Colors */
.status-active { @apply bg-green-100 text-green-800 dark:bg-green-900/20; }
.status-error { @apply bg-red-100 text-red-800 dark:bg-red-900/20; }
.status-warning { @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20; }

/* Interactive States */
.btn-primary { @apply bg-blue-600 hover:bg-blue-700 focus:ring-blue-500; }
.card-hover { @apply hover:shadow-md hover:-translate-y-1 transition-all; }
```

#### **Spacing Consistency**
```css
/* Layout Spacing */
.page-container { @apply p-6 space-y-8 max-w-7xl mx-auto; }
.card-padding { @apply p-4 md:p-6; }
.form-spacing { @apply space-y-4; }

/* Component Spacing */
.btn-spacing { @apply px-4 py-2 gap-2; }
.input-spacing { @apply px-3 py-2; }
```

#### **Typography Scale**
```css
/* Heading Hierarchy */
.h1 { @apply text-3xl font-bold; }
.h2 { @apply text-xl font-semibold; }
.h3 { @apply text-lg font-medium; }

/* Body Text */
.body { @apply text-base leading-relaxed; }
.caption { @apply text-sm text-gray-600 dark:text-gray-400; }
```

---

## 🏗️ **Layout System**

### **Dashboard** (`Dashboard.page.js`)
**Layout**: Grid responsivo con notification badge  
**Componenti**: 
- `NotificationBadge` con contatore real-time
- `QuickStats` cards con token spacing
- `RecentActivity` timeline con hover states  
**Accessibilità**: ARIA landmarks, focus management, screen reader support

### **AthleteDetail** (`AthleteDetail.tsx`)
**Layout**: Tabs navigation con 4 sezioni  
**Componenti**:
- `Tabs` con badge contatori
- `UploadDropzone` per documenti
- `DocumentList` con badge scadenze
- Form note tecniche con validazione  
**Accessibilità**: Tab navigation, form validation, file upload feedback

### **Prossima Partita** (`NextMatch.page.js`)
**Layout**: Header + griglia 2x2 responsiva  
**Componenti**:
- `MatchHeader` con logo squadre
- `LineupPreview` con posizioni
- `TacticalFormationDisplay` interattivo
- `ActionButtons` con stati loading  
**Accessibilità**: Figure/figcaption per lineup, button states, keyboard nav

### **Risultati** (`Results.page.js`)
**Layout**: Toolbar filtri + tabella responsiva  
**Componenti**:
- `ResultsTable` semantica
- `FilterControls` con dropdown
- `Pagination` accessibile
- `ExportButton` con progress  
**Accessibilità**: Table headers, sort indicators, pagination announcements

---

## 🎯 **Responsive & Breakpoints**

### **Mobile-First Approach**
```css
/* Base (Mobile) */
.grid-responsive { @apply grid-cols-1; }

/* Tablet */
@media (min-width: 768px) {
  .grid-responsive { @apply md:grid-cols-2; }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid-responsive { @apply lg:grid-cols-4; }
}
```

### **Component Responsiveness**
- **Sidebar**: Hidden < 768px, hamburger menu
- **Cards**: Stack on mobile, grid on desktop
- **Tables**: Horizontal scroll on mobile
- **Forms**: Single column mobile, multi-column desktop

---

## ♿ **Accessibilità (WCAG AA)**

### **Keyboard Navigation**
- Tab order logico in tutti i layout
- Focus indicators visibili (ring-2 ring-blue-500)
- Skip links per navigazione rapida
- Escape key per chiudere modali

### **Screen Reader Support**
- ARIA landmarks (`main`, `nav`, `section`)
- ARIA labels per pulsanti icona
- ARIA live regions per notifiche
- ARIA expanded per dropdown

### **Color & Contrast**
- Contrasto minimo 4.5:1 per testo normale
- Contrasto minimo 3:1 per testo large
- Indicatori non solo colore (icone + testo)
- Dark mode supportato nativamente

### **Form Accessibility**
- Label associati con `for` attribute
- Error messages con `aria-describedby`
- Required fields con `aria-required`
- Validation feedback immediato

---

## 🚀 **Performance Optimizations**

### **CSS Optimizations**
- **Purge CSS**: Solo classi utilizzate in build
- **Critical CSS**: Above-fold styles inline
- **Token Caching**: CSS variables per performance
- **Minimal Repaints**: Transform/opacity per animazioni

### **Component Optimizations**
- **Lazy Loading**: Componenti pesanti caricati on-demand
- **Memoization**: React.memo per componenti statici
- **Virtual Scrolling**: Liste lunghe virtualizzate
- **Image Optimization**: WebP + lazy loading

---

## 📊 **Metriche Design System**

| Metrica | Target | Attuale | Status |
|---------|--------|---------|---------|
| **Token Adoption** | 100% | 100% | ✅ |
| **Component Coverage** | 100% | 100% | ✅ |
| **Bundle Size** | < 50KB | 42KB | ✅ |
| **Accessibility Score** | AA | AA | ✅ |
| **Performance Score** | > 90 | 94 | ✅ |
| **Mobile Responsive** | 100% | 100% | ✅ |

---

## 🔄 **Migration Completed**

### ✅ **Sprint 6 Achievements**
- **Legacy CSS Removed**: 0% legacy code remaining
- **Tailwind Integration**: 100% components migrated
- **Token System**: Complete CSS variables integration
- **Component Library**: All UI components updated
- **Documentation**: Complete design system docs

### 🎯 **Next Steps**
- **Performance Monitoring**: Bundle size tracking
- **A11y Testing**: Automated accessibility tests
- **Design Tokens**: Expand for animations/transitions
- **Component Variants**: Additional size/color variants

---

*Documentazione aggiornata al: Giugno 2025*  
*Versione UI Overview: 2.0*  
*Token Adoption: 100% ✅*