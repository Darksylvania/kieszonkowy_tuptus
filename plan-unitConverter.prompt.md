## Plan: Web-based Unit Converter (Mobile + Desktop)

**TL;DR**: Build a responsive web app (HTML/CSS/JS) that converts between length, weight, volume, and area units. The UI will be a polished single-page interface with category selection, unit pickers, input/output fields, and subtle animations. It will also include basic PWA support so it can be installed on Android.

**Steps**
1. **Create project scaffold**
   - Ensure the workspace contains the static app files (HTML/CSS/JS).
   - Add a `manifest.json` and `service-worker.js` to support installability and offline caching.

2. **Define project files**
   - `index.html` (UI layout + PWA metadata)
   - `styles.css` (polished look + animations)
   - `renderer.js` (conversion logic + DOM wiring)
   - `manifest.json` (PWA metadata)
   - `service-worker.js` (offline caching)

3. **Conversion logic**
   - Implement a data structure that maps categories (length, weight, volume, area) to units and conversion factors.
   - Use a base unit per category (e.g., meters, kilograms, liters, square meters) and convert via base for precision.
   - Add validation and rounding logic.

4. **UI design**
   - Dropdown to select category.
   - Two dropdowns for "From unit" and "To unit".
   - Input field for numeric value.
   - Output display for converted value.
   - Add subtle animations (transitions on updated results, hover effects, responsive layout).

5. **Testing/verification**
   - Open `index.html` in a browser (desktop) and confirm UI loads.
   - (Optional) Run a small local server and open the app on Android via local network.
   - Verify conversions for each category.
   - Ensure UI is responsive and accessible.

**Relevant files**
- `index.html`, `renderer.js`, `styles.css` — UI and conversion logic.
- `manifest.json`, `service-worker.js` — PWA support.

**Verification**
1. Open `index.html` in a browser and confirm UI loads.
2. Verify conversions are correct (e.g., 1 km = 1000 m, 2 lb = 0.907 kg, 1 gallon = 3.785 L, 1 acre = 4046.86 m²).
3. On a mobile browser, use “Add to Home screen” to install the app (PWA).

**Decisions**
- Target environment: browser (desktop + mobile), with PWA install for Android.
- Unit categories: length, weight, volume, area.
- Use plain HTML/CSS/JS (no framework) for simplicity and compatibility.

**Further Considerations**
1. If you want offline-first support, we can enhance caching strategies in `service-worker.js`.
2. If you want a packaged Android app, we can later wrap this with Capacitor or Cordova.
