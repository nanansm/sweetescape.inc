# Design System Strategy: The Digital Patisserie

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

This system moves away from the rigid, boxy layouts of traditional e-commerce to embrace a high-end editorial aesthetic inspired by lifestyle magazines and premium social media feeds. We are not just selling cakes; we are curating an experience of indulgence and warmth.

The design breaks the "standard template" look through **Intentional Asymmetry**. Photography is never just a square in a grid—it is often layered, slightly offset, or framed with generous white space to allow the product to breathe. By combining high-contrast typography scales with a "no-line" philosophy, we create a UI that feels like an invitation rather than a transaction.

---

## 2. Colors: Tonal Depth & Warmth
Our palette is rooted in the "Soft Cream" and "Warm Brown" of a master pastry chef’s kitchen, punctuated by a "Sophisticated Red" (`primary: #86252b`) that evokes luxury packaging.

*   **The "No-Line" Rule:** To maintain a premium, seamless feel, 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a promotional section using `surface-container-low` (#f8f3ee) should sit directly against the main `background` (#fef8f3) without a dividing stroke.
*   **Surface Hierarchy & Nesting:** Treat the interface as physical layers of fine stationery.
    *   **Level 0 (Base):** `surface` (#fef8f3)
    *   **Level 1 (Cards/Modules):** `surface-container-lowest` (#ffffff) for a clean, lifted look.
    *   **Level 2 (In-set Content):** `surface-container` (#f3ede8) for subtle grouping.
*   **The "Glass & Gradient" Rule:** Floating elements, such as navigation bars or image captions, should utilize Glassmorphism. Use semi-transparent `surface` colors with a `backdrop-blur` of 12px to 20px.
*   **Signature Textures:** For high-impact CTAs, use a subtle linear gradient from `primary` (#86252b) to `primary-container` (#a63d40) at a 135-degree angle. This adds "soul" and depth that a flat color cannot achieve.

---

## 3. Typography: The Editorial Voice
We utilize a sophisticated pairing of **Noto Serif** for prestige and **Plus Jakarta Sans** for modern clarity.

*   **Display & Headlines (Noto Serif):** Used for large, evocative statements and product names. These should feel delicate and stylish. Use `display-lg` (3.5rem) for hero sections to immediately establish a high-end tone.
*   **Body & Labels (Plus Jakarta Sans):** Used for all functional text and descriptions. The clean, geometric nature of Jakarta Sans ensures legibility at small sizes (`body-sm`: 0.75rem), balancing the romanticism of the serif headlines.
*   **Hierarchy as Identity:** Wide letter-spacing (tracking) should be applied to `label-md` and `label-sm` when used for categories or eyebrow text, echoing the "curated" feel of an art gallery.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too heavy for a "warm and inviting" brand. We achieve depth through **Tonal Layering**.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#ffffff) card on a `surface-container` (#f3ede8) background. The subtle shift in hex value creates a natural, soft lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a "Quick Add" button), use an extra-diffused shadow: `box-shadow: 0 10px 30px rgba(134, 37, 43, 0.06)`. Note the use of a primary-tinted shadow rather than grey, which keeps the palette warm.
*   **The "Ghost Border" Fallback:** If containment is functionally necessary, use a "Ghost Border": `outline-variant` (#ddc0be) at 20% opacity.
*   **Glassmorphism:** Apply to floating headers and overlays to allow the rich food photography to bleed through, softening the edges of the UI.

---

## 5. Components: Modern Minimalist
All components utilize the **Roundedness Scale** (Default: `0.5rem`) to ensure they feel approachable and soft.

*   **Buttons:**
    *   **Primary:** Gradient fill (`primary` to `primary-container`) with `on-primary` (#ffffff) text. Use `lg` (1rem) rounding.
    *   **Secondary:** `surface-container-highest` (#e7e1dd) background with `primary` text. No border.
*   **Cards:** Forbid divider lines. Separate product titles from prices using vertical white space (`spacing-2.5` to `spacing-3`). Use `surface-container-lowest` (#ffffff) for the card body against a `surface` background.
*   **Input Fields:** Use `surface-container-low` (#f8f3ee) for the field background. Labels in `label-md` should sit above the field, not inside, to maintain an editorial layout.
*   **Signature Component - The "Polaroid" Frame:** For the social media feel, photography should sometimes be wrapped in a thick `surface-container-lowest` border (e.g., `spacing-3`), mimicking a physical photo.
*   **Chips:** Use `secondary-container` (#fed3c7) with `on-secondary-container` (#795950) for a soft, "confectionary" look for tags like "Gluten-Free" or "Seasonal."

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Negative Space:** Use `spacing-16` (5.5rem) or `spacing-20` (7rem) between major sections to emphasize a premium, unhurried experience.
*   **Layer Images:** Allow some images to overlap slightly with background text or other containers to create a sense of depth and curation.
*   **Focus on Detail:** Use `label-sm` for tiny details like "Baked Fresh Daily," treated with all-caps and generous tracking.

### Don't:
*   **Don't Use Pure Black:** Never use #000000. Use `on-surface` (#1d1b19) for text to keep the heat in the design.
*   **Don't Use Harsh Borders:** Avoid 100% opaque borders. They clutter the UI and break the "Digital Curator" illusion.
*   **Don't Over-Animate:** Interactions should be soft fades or gentle vertical slides (0.3s ease-out), mirroring the slow, deliberate pace of a high-end shop.
*   **Don't Crowd the Photography:** High-quality food shots are the hero. Never overlay heavy text directly over the subject of a photo; use the "Glassmorphism" rule for captions.