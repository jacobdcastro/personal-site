# Galaxy Nav — Design & Build Plan

The homepage is a 3D galaxy whose stars are links. The user can click-and-drag
to rotate the galaxy; a handful of "link-stars" carry labels (Twitter, GitHub,
resume, blog, email, a few projects) that fade in as they rotate to face the
viewer. A bottom-right accessibility toggle swaps the whole thing for a plain,
semantic link menu.

## Core principle

**Links are data. Mode is a boolean. Both renderers consume the same data.**

```ts
const LINKS = [ { id, label, href, position: [x, y, z] }, ... ] // single source of truth
```

The accessible list is the baseline truth; the 3D galaxy is progressive
enhancement layered on top.

---

## 1. The galaxy dust (decoration)

Thousands of little white dots (~5k–15k) arranged in a galaxy shape. **Not**
individual components — that would melt the browser.

- **One `<Points>` object** holding a `Float32Array` of positions. One draw call.
- **Shape via math, not modeling** (Bruno Simon "Galaxy Generator" recipe): per
  star, pick a random radius → assign to one of `K` spiral branches → add a
  `spin` angle proportional to radius → add randomized scatter, stronger toward
  the outside. Logarithmic spiral arms fall out for free.
- Color lerps from a warm inner hue to a cool outer hue.
- `PointsMaterial` (or custom shader for soft round points) with
  `sizeAttenuation`, `depthWrite: false`, additive blending → glowy look.
- Generated **once**, memoized.

## 2. Link-stars (interactive nodes)

Separate from the dust. ~7 nodes, each a real positionable/raycastable object.

- Each is data: `{ id, label, href, position }`. Placed deliberately *within*
  the galaxy volume, spread along arms at varying radii so they feel embedded.
- Rendered as a slightly larger glowing sprite / small icosahedron with
  emissive material (+ bloom makes them read as "special stars").
- **Labels → drei `<Html occlude>`** = real `<a>` anchors: crisp text, native
  hover, keyboard focus, Tailwind styling, right-click-open-in-new-tab, crawlable.
  - `occlude` so labels behind the galaxy get depth-hidden.
  - DOM labels don't receive bloom — so the **star** carries the glow, the
    **label** is styled text beside it. Correct division of labor.

## 3. Rotation + drag

**Rotate the galaxy `<group>` itself**, not the camera (snow-globe feel; camera
stays put, which makes the front/back reveal trivial — a star's world-Z tells
you if it faces the viewer).

- Pointer events on canvas → map deltaX/deltaY to rotation around Y and X axes.
- Add **inertia/damping** (velocity decays after release) and a slow **idle
  auto-spin** when untouched. `@react-spring/three` (already in stack) handles
  the damping + label fades.

## 4. The reveal — "only ~3 labels visible at a time"

Falls out of #3 naturally. Each frame, per link-star:

- Compare star direction to camera (dot product of star world-normal vs camera
  direction, or check world-space Z after rotation).
- Map dot product → **opacity**: facing = 1, edge = fading, behind = 0. Far-side
  labels fade out; new ones rotate in and fade up. No manual "show exactly 3"
  list — it's a continuous function of rotation. (Can optionally cap to N
  most-forward-facing if it gets cluttered.)
- Bonus: brighten + slightly scale a star as it faces the viewer.

## 5. Tap vs. drag (navigation)

Click the **star or the label** to open. Distinguish tap from drag by movement
threshold:

- On `pointerdown`: record position + time; track total movement.
- On `pointerup`: movement < ~5px and elapsed < ~250ms → **tap** → navigate.
  Otherwise it was a drag → inertia takes over, no navigation.
- Logic lives on the canvas/star, not the raw `<a>`. The `<a href>` still exists
  for accessibility / right-click / crawlers, but synthetic clicks that were
  actually drags get `preventDefault`.

## 6. Accessibility toggle + fallback

Fixed bottom-right button: **"disable 3D"** → swaps galaxy for the most basic
accessible DOM link menu.

```
mode === '3d'   → <GalaxyCanvas links={LINKS} />   (client-only)
mode === 'list' → <PlainNav links={LINKS} />        (semantic <nav><ul><li><a>)
<ModeToggle />  always rendered, fixed bottom-right
```

- Mode in **Zustand**, **persisted** to `localStorage` (`persist` middleware).
- **Default to `list`** when, on first load: `prefers-reduced-motion: reduce`;
  OR WebGL context fails to init; OR (optional) coarse pointer + small viewport.
- Even in `3d` mode, render `PlainNav` in an SSR'd visually-hidden `<nav>` so
  crawlers + screen readers always see real links.

## SSR note (TanStack Start)

`<Canvas>` can't render on the server (no WebGL) → `GalaxyCanvas` must be
**client-only** (lazy / no-SSR guard). `PlainNav` **can and should SSR**. First
paint = real links; galaxy hydrates after. Zero-JS and slow connections still
get a working site.

---

## State split

- **Zustand** (persisted): high-level UI — `mode`, `hoveredLink`, `isDragging`,
  optional `targetRotation` (for "click a nav item to spin to that star").
- **Per-frame** (rotation, opacities): refs + `useFrame`, **never** React state.
  Re-rendering React 60×/sec is the classic r3f perf trap.

## Architecture

```
LINKS (data) ──┬──> GalaxyCanvas (client-only)
               │      <group> (rotates via drag, ref-based useFrame)
               │        GalaxyDust   — one <Points>, ~10k stars, generated once
               │        LinkStars    — LINKS → glowing sprite + <Html occlude> anchor
               │                       opacity = f(facing camera); tap-vs-drag detect
               │      Bloom/Effects
               │
               └──> PlainNav (SSR'd, semantic <nav><ul>)
                      — visible when mode === 'list'
                      — present hidden for a11y/SEO when mode === '3d'

ModeToggle (fixed bottom-right) ──> zustand { mode, setMode } (persisted)
                                     defaults from prefers-reduced-motion / WebGL detect
```

---

## Build order (each step independently shippable)

1. **Data + PlainNav first.** Define `LINKS`, build the accessible menu, the
   toggle button, persisted Zustand mode state. A complete, accessible site with
   zero 3D — the fallback *and* the foundation.
2. **Static galaxy dust.** One `<Points>` + spiral generator. No interaction.
   Tune count, colors, size, branches, spin, scatter.
3. **Link-stars + labels, static.** Place the ~7 nodes, glowing sprites,
   `<Html>` labels. No rotation — just see them embedded in the galaxy.
4. **Rotation + drag + inertia + idle spin.** Make it come alive.
5. **Facing-based label fade** (the reveal) + **tap-vs-drag** navigation.
6. **Bloom / post-processing** polish + reduced-motion / mobile defaults.

---

## Open aesthetic choices (defer to build time)

- **Link-stars (~7):** Twitter, GitHub, resume, blog, email + a few projects.
  Cluster or spread across arms?
- **Camera angle:** top-down disc view vs. 3/4 tilt (tilt reads better for a
  draggable object — more depth, arms recede).
- **Color story:** true-to-life white/blue starfield vs. brand-tinted.
