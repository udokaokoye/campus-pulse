# Campus Pulse — Product Overview

## What is it?
A social + events platform for college students. Hyper-local, scoped per campus.

## How it works
- Students sign up with their college `.edu` email
- The app detects which college they belong to based on the email domain
- All content (events, wall posts) is scoped to their campus

## Core Features

### 📍 Events
- Map-based view of campus events with location pins
- Browsable event feed with infinite scroll
- Organizations can post events

### 🧱 The Wall (Anonymous + Ephemeral)
- Anonymous posting wall scoped per campus
- Each student gets an **auto-generated alias** at signup (not their real name)
- All wall posts and interactions use this alias
- **Posts expire after 24 hours** — auto-hidden to create FOMO and drive daily engagement
- Students need to check in regularly to see what's new before it disappears

### 📸 Stories (Home/Map Screen)
- **Friends stories** — horizontal carousel at the top of the home screen. See what friends are doing on campus. Classic Instagram-style UX.
- **Event stories** — tied to specific events. Tap into an event to see stories from people there.
  - Authors choose on upload whether to share their story to the event feed (opt-in toggle)
- Stories live on the home/map screen alongside the map view

### 👥 Social — Follow/Following Model
- Asymmetric follow model (like Instagram)
- Users can follow others without needing approval
- "Friends" stories on home screen = stories from people you follow

### 👤 Profiles
- Avatar, bio, website URL
- College major, graduation year, grad level
- Real identity (name) only visible on profile, NOT on the wall

## Tech Stack
- React Native / Expo (file-based routing)
- NativeWind / Tailwind for styling
- React Query for data fetching
- TypeScript

## Monetization (Future)

### Tier 1 — Easy wins
- **Promoted events** — Orgs/local businesses pay to pin events at top of feed or highlight on map
- **Sponsored wall posts** — Local businesses post on the wall as "Sponsored"

### Tier 2 — Premium (Campus Pulse+)
- See who viewed your story
- Custom wall alias
- Extended story/post duration
- Profile customization (themes, badges)
- Boost wall posts (longer lifespan / more visibility)

### Tier 3 — At scale
- Campus analytics for orgs & university admin (anonymized engagement data)
- Local business ad dashboard (targeted per campus)
- Recruitment/job board (companies pay to post internships scoped by campus/major)

**Strategy:** Don't monetize early. Nail engagement first, then start with promoted events.

## Notes
- `@mail.uc.edu` validation in signup is a placeholder — will be generalized to any `.edu` email
- Backend API integration is pending — UI is being built first
