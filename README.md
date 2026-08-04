# Your Porn Guy (YPG) - Adult Directory & Webmaster PPC Network

A modern, high-performance adult directory platform and Pay-Per-Click (PPC) affiliate network built with React, Vite, Tailwind CSS, and Express. Standardizing site discovery across VR, AI Companion, Tube, Premium, and Cam categories while empowering bloggers and webmasters with real-time PPC monetization.

---

## 🚀 Key Features

### 1. 📂 Adult Directory & Site Discovery
* **Curated Verified Listings**: Browse verified adult platforms featuring editor scores (0–100), user star ratings, pricing tiers (Free, Freemium, Subscription, Paid), pros/cons, and direct affiliate links.
* **Category Filtering**: Filter by top adult categories including AI Companions, 8K VR, Tube Sites, Premium Networks, Live Cams, Adult Toys, and Privacy VPNs.
* **Global Search & Quick Modal**: Search instantly across 15,000+ indexed sites using the top search bar or trigger the quick search modal anytime using `Cmd + K` or `Ctrl + K`.
* **Side-by-Side Comparison**: Select up to 3 listings to compare pricing, content quality, VR support, speed scores, and features side-by-side.
* **Webmaster Site Submission**: External webmasters can submit their sites for directory inclusion via a streamlined submission form.

---

### 2. 🛡️ Role-Based Access & Unified Admin Panel

Switch seamlessly between user roles using the account role selector in the header navigation:

#### 👤 Visitor / Reader Role
* Full access to browse directory listings, search, compare, and read blog reviews.
* Can submit websites for directory consideration.
* Can apply for a Blogger / Webmaster account.

#### ✍️ Blogger / Publisher Role
* **Blogger Dashboard**: View real-time analytics including article views, unique clicks, Click-Through Rate (CTR), total earnings, and pending payouts.
* **PPC Ad Banners**: Access embeddable ad banner codes (HTML/JavaScript) to place on external blogs or adult sites to monetize traffic.
* **Article Publishing**: Publish comprehensive review articles for directory listings with referral attribution.
* **Payout Requests**: Request earnings withdrawals via Crypto (BTC/USDT), PayPal, Paxum, or Wire Transfer once reaching the minimum payout threshold.

#### 🛡️ Unified Admin Role
* **Unified Admin Panel**: Accessible directly via the top navigation bar or user menu (`Admin Panel`).
* **Direct Site Publisher**: Admins can directly create, edit, and publish new site listings into the live directory without waiting for user submissions.
* **Pending Submissions Queue**: Review, approve, or reject website submissions sent in by webmasters.
* **Blogger Approval Queue**: Review and approve pending blogger applications.
* **Payout Management**: Inspect pending withdrawal requests, review payment details, and approve payouts.
* **Anti-Fraud & Click Logs**: Audit click logs with IP hashing, user agent verification, referrer checking, and 24-hour rate limiting to prevent invalid/bot clicks.
* **PPC Payout Rate Settings**: Configure global CPC payout rates (e.g., $0.15 per click) and minimum withdrawal thresholds.

---

### 3. 💸 Anti-Fraud PPC Tracking Engine

* **Server-Side Click Verification**: Every outgoing link click routes through `/api/click/register` to log traffic.
* **Bot & Duplicate Protection**: Uses IP hashing and 24-hour cooldown windows per visitor to enforce strict unique-click payout attribution.
* **Real-time Balance Updates**: Valid clicks automatically update blogger earnings and admin analytics in real time.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons
* **Backend**: Express.js REST API (`server.ts`)
* **Build System**: `esbuild` for CJS backend compilation and Vite for frontend assets
* **Data Persistence**: In-memory JSON database (`db.json`) with automated filesystem persistence

---

## 🏃 Running locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Security & Privacy

* **IP Anonymization**: IP addresses are hashed server-side before storage to maintain visitor privacy while preventing click fraud.
* **Restricted Admin Privileges**: Only verified Admin accounts can directly add listings or approve pending webmaster submissions.
