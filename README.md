# SDLPC Education — Unified Multi-Platform Application

Super-minimal, luxury-dark, high-conversion educational platform engineered from a single codebase for **Website**, **Android APK**, and **iOS App**.

---

## 🌟 Key Highlights & Design Decisions
- **Design Inspiration**: Faithfully modeled on the reference aesthetics (deep matte obsidian `#08080a`, radiant crimson accents `#ff2d55`, glassmorphic panels, and crisp sans-serif typography).
- **Interactive Centerpiece**: The bold **`S D L P C`** display in the hero section features **individual kinetic spring physics** — hover or touch any letter to glide, expand, and trigger a crimson optical backlight glow.
- **Zero Emojis**: Built strictly with **100% precision SVG vector icons** (`lucide-react`) for a professional, institutional look.
- **All Coming Soon**: Daily Quiz, Weekly Test Series, Monthly Grand Mocks, and Curated Courses are configured with sleek, non-intrusive "Coming Soon" badges.
- **Pre-Registration Flow**: High-conversion animated modal capturing student details and storing them locally, pre-wired for 1-step Firebase Firestore activation later.

---

## 🚀 How to Run the Website (Live Dev & Production)

### Run Live Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Build Production Website
```bash
npm run build
```
The optimized production bundle is generated in the `dist/` directory.

---

## 📱 How to Build for Android (APK)

The project is already pre-configured with **Capacitor Android**:

1. **Build web assets & sync**:
   ```bash
   npm run build
   npx cap sync android
   ```

2. **Open in Android Studio to build the APK**:
   ```bash
   npx cap open android
   ```
   In Android Studio, click **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate `app-debug.apk`.

3. **Or build APK directly via command line** (requires Android SDK):
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   The APK will be located at `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🍏 How to Build for iOS (App Store)

On a macOS machine with Xcode:
```bash
npm run build
npx cap add ios
npx cap open ios
```
In Xcode, select your simulator or connected iPhone and click **Run**.

---

## ⚡ Connecting Firebase Later

As requested, Firebase is not connected yet. When you are ready:
1. Run `npm install firebase`
2. Open `src/services/registrationService.js`
3. Follow the clear commented instructions inside `registrationService.js` to plug in your Firebase config. No changes to the UI or components are needed.
