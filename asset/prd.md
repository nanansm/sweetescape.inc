# Product Requirements Document (PRD): Sweet Escape Digital Storefront

## 1. Project Overview
**Objective:** To build a mobile-first, highly visual web catalog for a cake shop. The platform will use an Instagram-grid aesthetic to display active stock, utilize Google Sheets as a low-friction headless CMS, and funnel conversions through a streamlined WhatsApp checkout process.

**Target Audience:** Mobile users discovering the brand via social media who want a frictionless way to view current stock and place orders directly to the shop's admin.

## 2. Technical Stack & Architecture
* **Design Prototyping:** [Google Stitch](https://stitch.withgoogle.com/) (for rapid UI component generation).
* **Development Environment:** Cursor (using Claude Code).
* **Frontend:** Vanilla JavaScript + HTML5 + Tailwind CSS (Recommended for a lightweight, fast-loading site without the overhead of a heavy framework, easily prompted in Cursor).
* **Database/CMS:** Google Sheets (via Google Apps Script to output a JSON endpoint, or a service like SheetDB/Stein).
* **State Management:** Browser `localStorage` (to persist cart data if the user refreshes).
* **Checkout Routing:** WhatsApp Click-to-Chat API (`wa.me`).
* **Hosting:** Vercel, Netlify, or GitHub Pages (Free and easily deployed from Cursor).

## 3. Functional Requirements

### 3.1. Google Sheets CMS (Database)
The website must fetch live data from a published Google Sheet. 
* **Required Columns:**
    * `ID` (Unique identifier, e.g., SKU001)
    * `Image_URL` (Direct link to the image file)
    * `Product_Name` (e.g., "Hampers Katalog Sweet Escape")
    * `Price` (Numeric value in IDR for calculation, e.g., 85000)
    * `Description` (Optional short text)
    * `Category` (e.g., Hampers, Whole Cake, Pastry)
    * `In_Stock` (Boolean: TRUE/FALSE)
* **Logic:** The frontend will only render products where `In_Stock` is TRUE.

### 3.2. User Interface & Display (The "Instagram Layout")
* **Grid System:** * Mobile: 2 or 3 columns (square 1:1 aspect ratio images).
    * Tablet: 4 columns.
    * Desktop: 5-6 columns with a max-width container to prevent the UI from stretching too far.
* **Card Design (Readability Focus):** Since Instagram layouts can be visually chaotic, we must separate the image from the text data.
    * *Visual:* 1:1 Image on top.
    * *Data Panel:* A solid white (or brand color) block below the image containing the Product Name (bold, clear sans-serif), Price (formatted to Rupiah), and a high-contrast "Add to Cart" button (e.g., a `+` icon or minimal text).
* **Header:** Sticky top navigation containing the brand logo and a Cart Icon with a dynamic notification badge showing the number of items.

### 3.3. Cart System
* **Interactions:** Users can click "Add to Cart" directly from the grid.
* **Cart View:** A slide-out panel (drawer) or a dedicated modal page showing:
    * List of selected items.
    * Quantity toggles (+ / -) for each item.
    * Trash icon to remove an item.
    * Dynamic subtotal calculation.
* **Persistence:** Cart contents must survive a page reload.

### 3.4. WhatsApp Checkout Integration
* **Logic:** When the user clicks "Checkout via WhatsApp" in the cart, the system must bundle the cart array into a URL-encoded string.
* **Output Format:**
    ```text
    Hello Sweet Escape, I would like to order:
    
    1x Hampers Ramadhan - Rp 150.000
    2x Flower Gift Cake - Rp 470.000
    
    Total: Rp 620.000
    
    Is this available?
    ```
* **Execution:** Redirect user to `https://wa.me/[YOUR_PHONE_NUMBER]?text=[ENCODED_MESSAGE]`.

## 4. Non-Functional Requirements
* **Performance:** Images must implement `loading="lazy"` to ensure fast initial page loads, crucial for an image-heavy "Instagram" style grid.
* **Responsive State:** Touch targets (buttons, cart icons) must be a minimum of 44x44 pixels to ensure comfortable tapping on mobile devices.
* **Error Handling:** If the Google Sheet API fails to load, display a graceful fallback UI ("Menu is currently updating, please order directly via our WhatsApp").

---

## 5. Implementation Roadmap (For Cursor & Claude)

Here is how to instruct Claude inside Cursor to build this out systematically:

**Phase 1: CMS Setup**
1.  Create the Google Sheet with the exact column headers mentioned in section 3.1.
2.  Add 5-6 sample rows of your cakes/hampers.
3.  Publish the sheet to the web as a CSV, or use a free tool like *SheetDB* to get a REST API endpoint.

**Phase 2: UI Foundation (Prompting Claude)**
* *Prompt to use in Cursor:* "Create a responsive `index.html` using Tailwind CSS. Build a sticky header with a logo on the left and a cart icon on the right. Below it, create an empty container `<div id="product-grid">` that uses a CSS Grid (2 columns on mobile, 4 on desktop) for an Instagram-style layout."

**Phase 3: JavaScript Logic (Prompting Claude)**
* *Prompt to use in Cursor:* "Write a JavaScript file that fetches data from this URL [Insert Sheet API URL]. Filter the data to only include items where `In_Stock` is true. For each item, generate a card and append it to the `#product-grid`. The card should have a 1:1 image, title, formatted IDR price, and an 'Add' button."

**Phase 4: Cart & WhatsApp Logic (Prompting Claude)**
* *Prompt to use in Cursor:* "Implement a shopping cart using `localStorage`. When the 'Add' button is clicked, add the item to an array. Create a cart modal that displays these items, calculates the total price in IDR, and has a checkout button. The checkout button should format the order into a text string and redirect to a WhatsApp `wa.me` link."
