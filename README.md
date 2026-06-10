# CalorAI Taste Profile

## 1. Project Introduction

Welcome to the **CalorAI Taste Profile** application. 

Traditionally, establishing a user's food preferences requires tedious onboarding flows—long lists of checkboxes, overwhelming grids of ingredients, and repetitive form inputs. CalorAI solves this by turning preference gathering into an engaging, tactile experience. Inspired by modern dating applications, it allows users to swiftly categorize foods through an intuitive card-swiping interface. 

This project was built as an internship submission to demonstrate proficiency in modern mobile engineering. The primary evaluation vectors were:
- **Fluid User Interfaces:** Implementing a responsive, visually striking "Glassmorphism" design system.
- **Complex Gesture Handling:** Managing real-time pan gestures and spring-physics animations without dropping frames.
- **Robust Architecture:** Structuring a scalable, maintainable React Native codebase using TypeScript.
- **Cross-Platform Consistency:** Ensuring a seamless experience across both iOS and Android platforms.

Guided by the principles of immediate user feedback and high-performance rendering, the application leverages native-driven animations and localized state management to deliver a premium, 60FPS experience.

---

## 2. Feature Walkthrough

### Swipe Experience
- **What it does:** The core mechanic of the app. Users are presented with a stack of food cards. They can swipe right to "Like," left to "Dislike," up for "Super-like," and down for "Unsure."
- **Why it exists:** To minimize cognitive load during the onboarding process and make data collection playful.
- **User Experience:** Cards follow the user's finger perfectly. As the card translates off-center, visual indicators (like changing opacities and rotation) telegraph the action being taken. Haptic feedback triggers upon crossing a decision threshold.
- **Technical Highlights:** Implemented using React Native's built-in `PanResponder` alongside `react-native-reanimated`. This approach allowed for smooth stylistic interpolations and robust gesture tracking without the dependency conflicts of third-party gesture libraries.

### Action Buttons
- **What it does:** Floating, glass-styled buttons positioned below the card stack that replicate the swipe actions.
- **Why it exists:** Accessibility and user preference. Not all users prefer swiping; some prefer explicit tap targets.
- **User Experience:** Tapping a button triggers the exact same exit animation as a swipe, maintaining visual consistency.
- **Technical Highlights:** The buttons imperatively drive the same `SharedValue` animation nodes used by the pan responder, meaning the physics and transitions remain completely unified.

### Progress Tracking
- **What it does:** A sleek progress bar anchored at the top of the screen.
- **Why it exists:** To provide users with a sense of orientation and completion throughout the swiping session.
- **Technical Highlights:** The progress bar width is dynamically calculated and smoothly animated via Reanimated layout transitions as the card index increments.

### Taste Profile Generation (Results)
- **What it does:** Analyzes the user's swipe decisions to generate a customized flavor profile summary.
- **Why it exists:** To reward the user for completing the onboarding flow with immediate, personalized value.
- **Technical Highlights:** Aggregates data from local state, calculating weightings for different food categories before rendering a final visual summary.

### Interactive Navigation & FAQ
- **What it does:** A persistent bottom navigation bar and a dedicated FAQ screen with expandable sections.
- **Why it exists:** To allow users to seek help or navigate the app without losing their swipe progress.
- **Technical Highlights:** Built using `@react-navigation/native-stack` for native-feeling screen transitions, complemented by custom translucent header components.

---

## 3. Screens Overview

### Intro Screen
**Purpose:** Welcomes the user and establishes the app's branding and aesthetic tone.
**Flow:** Leads directly into the core swiping experience via a prominent call-to-action.
**Implementation:** Utilizes full-screen blurred backgrounds and dynamic floating blobs to immediately introduce the Glassmorphism visual language.

### Swipe Screen
**Purpose:** The primary interactive surface where preference gathering occurs.
**Flow:** Users clear the stack of cards to proceed to the Results Screen.
**Implementation:** Manages the active state of the card stack. Composes `CardStack`, `FoodCard`, and `BottomNav` components.

### Results Screen
**Purpose:** Displays the calculated taste profile.
**Flow:** Reached upon emptying the card stack. Users can review their profile and potentially restart the process.
**Implementation:** Parses the array of swiped items (liked, disliked, super-liked) to render visually distinct categorization cards.

### FAQ Screen
**Purpose:** Provides context and answers to common user questions.
**Flow:** Accessible at any time via the bottom navigation bar.
**Implementation:** Features an accordion-style list using Reanimated to smoothly transition height properties as items expand and collapse.

---

## 4. Technology Decisions

Every library was chosen to maximize performance and developer velocity while minimizing bundle size bloat.

- **React Native (0.81) & Expo (SDK 54):**
  - *Why:* Provides a highly optimized, pre-configured native build environment. Expo's modern architecture handles assets, routing, and over-the-air updates seamlessly.
  - *Alternatives considered:* React Native CLI (Vanilla). Rejected because Expo SDK 54 offers significantly better developer ergonomics and out-of-the-box support for complex native modules.

- **TypeScript (5.9):**
  - *Why:* Catching type errors at compile time is non-negotiable for production apps. Interface definitions for the food objects and component props serve as highly effective, self-updating documentation.

- **React Native Reanimated (3.x):**
  - *Why:* The standard React Native `Animated` API often drops frames during complex gesture interactions because it relies on the asynchronous JS bridge. Reanimated 3 utilizes worklets—small JavaScript functions that run synchronously on the UI thread—guaranteeing 60-120FPS animations.

- **React Native PanResponder:**
  - *Why:* Selected over `react-native-gesture-handler` to avoid wrapper requirements (`GestureHandlerRootView`) and conflict issues on certain Expo Go versions. It provides rock-solid, out-of-the-box gesture tracking.

- **React Native SVG & SVG Transformer:**
  - *Why:* Instead of managing `@1x`, `@2x`, and `@3x` PNG assets, SVGs provide mathematically crisp iconography across all pixel densities. The transformer allows importing `.svg` files directly as React components.

- **Expo Blur:**
  - *Why:* The backbone of the Glassmorphism aesthetic. Maps down to `UIBlurEffect` on iOS and `RenderEffect` / emulation fallbacks on Android for high-performance visual blurring.

---

## 5. Architecture Deep Dive

The architecture is heavily component-driven, favoring a flat, domain-oriented structure over deeply nested folder hierarchies.

### Component Hierarchy & Data Flow

```text
AppNavigator
├── IntroScreen
├── FAQScreen
├── ResultsScreen
└── SwipeScreen
    ├── ProgressBar
    ├── CardStack
    │   └── FoodCard
    ├── ActionButton
    └── BottomNav
```

- **State Management:** Given the localized nature of the swipe session, state is hoisted to the `SwipeScreen` and passed down via props. The array of remaining foods, the current index, and the history of swipes are managed here. If the app scales to include backend persistence, this state would migrate to a global store (e.g., Zustand or Redux).
- **Separation of Concerns:** UI primitives (like `GlassCard` and `ActionButton`) contain zero business logic. They purely consume props and emit events. Complex physics logic is isolated inside `FoodCard`.

---

## 6. Design System

The app utilizes a custom **Glassmorphism** design language to feel modern, lightweight, and deeply integrated with the mobile OS environment.

- **Color System:** Utilizes deep, vibrant gradient backgrounds (e.g., midnight blues, energetic purples) contrasted against stark white text.
- **Glass Elements:** Cards and UI elements achieve the "frosted glass" look using `expo-blur` combined with a semi-transparent background color (`rgba(255,255,255, 0.1)`), a subtle `1px` white border (`rgba(255,255,255, 0.2)`), and a soft drop shadow.
- **Typography:** Relies on system fonts optimized for legibility, employing heavy font weights for headers and medium weights for descriptive text to establish clear visual hierarchy.
- **SVG Iconography:** Consistent stroke widths and corner radii across all icons (`heart.svg`, `star.svg`, `cross.svg`, etc.) ensure visual cohesion.

---

## 7. Gesture & Animation System

The card swiping interaction is the most critical engineering piece of the application. 

- **Swipe Detection:** Built using React Native's `PanResponder`. As the user drags, the X and Y translations update Reanimated shared values to drive the UI.
- **Kinematics & UI Thread:** A `useAnimatedStyle` hook calculates rotation and opacity based on the X-axis translation using `interpolate`. For instance, moving the card 100 pixels to the right rotates it by 10 degrees and increases the opacity of the "LIKE" stamp.
- **Thresholds & Velocity:** When the user releases the screen, the pan responder evaluates the total translation distance and the fling velocity. 
  - If the velocity is high or the translation exceeds the screen width threshold, the card snaps off-screen using spring physics.
  - If the threshold is missed, the card snaps back to the origin `(0,0)`, indicating an incomplete action.
- **Haptic Integration:** `expo-haptics` is triggered to provide a tactile "click" the exact moment the card crosses the commit threshold, bridging visual and physical feedback.

---

## 8. Cross-Platform Considerations

React Native promises "write once, run anywhere," but achieving true parity requires platform-specific tailoring:

- **Blur Effects:** iOS handles dynamic blurring flawlessly at the OS level (`UIBlurEffect`). On older Android devices, deep blurring can cause layout thrashing. I utilized conditional rendering and fallback semi-transparent colors (`rgba(255,255,255, 0.15)`) for lower-end Androids to maintain the aesthetic without tanking performance.
- **Safe Area Insets:** Utilized `react-native-safe-area-context` to ensure the progress bar and bottom navigation clear the dynamic island / notch on iOS and the bottom gesture bar on Android.
- **Shadows:** iOS utilizes `shadowColor`, `shadowOffset`, `shadowOpacity`, and `shadowRadius`. Android requires the `elevation` property. Reusable primitives abstract these differences to ensure cards look identical on both operating systems.

---

## 9. Challenges & Solutions

**Challenge:** Conflicting gesture libraries causing instability in Expo Go.
**Investigation:** Initially attempted to use `react-native-gesture-handler`. However, the library requires wrapping the app in a `GestureHandlerRootView`, which led to obscure layout conflicts and instability on specific versions of the Expo Go client.
**Solution:** Refactored the gesture tracking entirely to use React Native's built-in `PanResponder`. It solved the gesture detection reliably out-of-the-box, eliminating the third-party dependency issues while maintaining excellent swiping performance and tracking precision.

**Challenge:** Synchronizing manual button taps with the swiping animations.
**Investigation:** Initially, swiping and button tapping utilized completely different animation lifecycles, leading to race conditions where a user could tap a button while a swipe was settling.
**Solution:** Refactored the architecture so that the Action Buttons imperatively update the exact same `SharedValue` nodes that the `PanResponder` controls. 
**Trade-off:** This tightly coupled the parent container with the card's internal animation state via `forwardRef` and `useImperativeHandle`, but resulted in a flawlessly unified animation system.

**Challenge:** SVGs not scaling correctly inside Expo without manual width/height props.
**Solution:** Configured `react-native-svg-transformer` inside `metro.config.js` to allow SVGs to inherit color and sizing from parent styled components dynamically.

---

## 10. Project Structure

```text
.
├── App.tsx                 # Entry point, registers the navigation container
├── app.json                # Expo application configuration and manifest
├── babel.config.js         # Babel compilation rules (Reanimated plugin)
├── metro.config.js         # Bundler config, heavily modified for SVG support
├── package.json            # Dependencies and scripts
├── assets/                 
│   └── icons/              # Raw vector graphics
└── src/                    
    ├── components/         # Pure, reusable UI blocks (GlassCard, FoodCard, etc.)
    ├── constants.ts        # Theming, dimensions, and global magic numbers
    ├── data/               # Local JSON payload simulating a backend API
    ├── navigation/         # Native-stack navigator setup and route typing
    ├── screens/            # Top-level screen components
    └── types/              # Global TypeScript interfaces
```

---

## 11. Local Development Guide

### Prerequisites
- Node.js (v18 or newer recommended)
- iOS Simulator (via Xcode) or Android Emulator (via Android Studio)
- Expo CLI

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the Expo development server:
```bash
npm start
```

- **Running on iOS:** Press `i` in the terminal to launch the iOS simulator.
- **Running on Android:** Press `a` in the terminal to launch the Android emulator.

*Troubleshooting:* If Metro cache becomes corrupted (often happens when altering `metro.config.js`), run `npm start -- --clear`.

---

## 12. Performance Considerations

- **Worklet Offloading:** No animation logic runs on the JavaScript thread. Everything is offloaded to the native UI thread.
- **Component Composition:** The `CardStack` maps over the food array, but limits the rendering to only the top 3 cards at any given time. The rest are unmounted. This prevents massive memory allocations when dealing with hundreds of items.
- **Asset Preloading:** SVGs are bundled directly into the JavaScript payload via the Metro transformer, entirely eliminating network roundtrips for iconography.

---

## 13. Assumptions & Trade-offs

- **Local Data vs API:** I assumed a local `.json` file was sufficient to demonstrate the UI/UX capabilities of the assignment. Implementing a mock API with artificial latency would have added unnecessary complexity without demonstrating further React Native proficiency.
- **Aesthetics over Broad Compatibility:** The heavy use of `expo-blur` and complex linear gradients targets modern flagship devices. If this were a production application targeting emerging markets, I would implement an "accessibility/low-power" toggle to disable blurs in favor of flat colors.

---

## 14. AI Usage Disclosure

In the interest of full transparency and engineering integrity, AI assistants (Gemini / Copilot) were utilized during the development of this project for:
- Generating boilerplate TypeScript interfaces from the `foods.json` data.
- Writing the boilerplate configuration for `metro.config.js` to support the SVG transformer.
- Assisting with the drafting of this README document.

**Human-Driven Decisions:** The core architecture, the exact physics tuning of the Reanimated spring configurations, the layout math for the Glassmorphism cards, and the state management flow were entirely human-engineered and written by hand.

---

## 15. Future Enhancements

If this application were slated for production, the immediate next steps would be:
1. **Backend Integration:** Replace the local JSON state with a `React Query` integration pointing to a Postgres/Supabase backend to persist user taste profiles.
2. **Advanced Animations:** Introduce deck-shuffling animations when the stack is reset, or 3D card flips to view nutritional information on the back of the cards.
3. **Localization:** Integrate `i18next` to support multiple languages, ensuring the UI flexes correctly for right-to-left (RTL) reading.

---

## 16. Submission Checklist

- [x] Implement Swipe Interface (Right, Left, Up, Down)
- [x] Create Taste Profile Generation logic
- [x] Implement Glassmorphism UI aesthetic
- [x] Ensure smooth 60FPS animations (UI Thread)
- [x] Add alternative Action Buttons
- [x] Support Cross-Platform (iOS & Android)
- [x] Use TypeScript rigorously
- [x] Provide a production-quality README
