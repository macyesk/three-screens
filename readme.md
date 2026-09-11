# Project Brief: Season Ticket Split Coordinator

## Product Description
A lightweight web app for a small group of friends (3-5 people) who split an NHL season ticket package. It lets each person mark interest in or claim specific games, see who else wants which games, join a waitlist for games that are already claimed, and see a running fairness tally across the group — so nobody ends up over- or under-represented on games, especially the big rivalry ones.

This is an interactive mock-up, not a production app. Use placeholder/sample data (a fictional team's schedule, 3-5 fictional friend names, a handful of games flagged as "rivalry/marquee"). No real backend, login, or persistence required — client-side state is fine.

## Core Concepts (carry these through every screen — lead with the value)

**Need:** Friends splitting an NHL season ticket package don't know which games each other actually cares about until it's too late — someone assumes no one wants a game and skips it, only to find a friend really wanted it, or two people show up expecting the same seat. Without a running record, it's easy for one person to end up with way more (or fewer) games — especially the big ones — than everyone else, without anyone noticing until the season's mostly over.

**Persona:** Part of a group of 3-5 friends splitting one NHL season ticket package. Has favorite opponents/rivalry games they care more about. Checks in on the group sporadically, not constantly.

**Capability:** Mark interest in or claim a specific game (first to claim wins), see who else wants which games, join a waitlist if a game is already claimed, and see each person's game count — including marquee/rivalry games — so the group can spot overlaps, gaps, and imbalances before it's too late.

**Fundamental Value: FAIRNESS.** Everyone can see, at a glance, that the split is even (including the good games, not just the total count) and that their preferences were accounted for — instead of trusting memory or hoping it evens out.

**The affordance sentence — this is the dominant thing a first-time user must encounter on the landing screen:** *"See who's got what — and make sure everyone gets a fair share of the season."*

## The Three Screens

### 1. Season Overview (Landing screen)
**Job:** Signal the core value (fairness) and primary capability (see + claim games) before the user reads anything else.
**Design question it answers:** Does the landing screen communicate capability + value at first glance, with nothing competing for attention?

**Content:**
- The affordance sentence/headline near the top, front and center.
- A compact per-person fairness snapshot (e.g., name + total games claimed + marquee games claimed) — this should be genuinely glanceable, not a big table.
- The full season schedule below/beside it: each game shows opponent, date, claim status ("Open" or "Claimed by [Name]"), and a visual flag for rivalry/marquee games.
- Tapping/clicking any game goes to Screen 2 (Game Detail).
- Nothing else. No settings, no login, no unrelated navigation competing with this job.

### 2. Game Detail
**Job:** Demonstrate the core interaction — claiming a game and the waitlist mechanic.
**Design question it answers:** Is the primary capability obvious and satisfying to use? Does the layout group "game info," "who has it," and "what I can do" clearly (Gestalt: proximity)?

**Content:**
- Game info at top: opponent, date/time, rivalry/marquee flag if applicable.
- Current status: if open, show "Open" and a **Claim This Game** button. If claimed, show who claimed it and a **Join Waitlist** button instead.
- If claimed, show the waitlist as an ordered list of names (e.g., "1. Macy, 2. Sam").
- Waitlist behavior: if the claimer "drops" the game (include a simple way to simulate this for the demo, like a "Give Up Claim" button), the person at position #1 is automatically promoted to claimant, and the list shifts up. Show this transition clearly.
- Clear, obvious way back to the Season Overview (Screen 1) from this screen.

### 3. Fairness Summary
**Job:** Make the fairness value tangible and visible with real numbers, not just implied by the app's existence.
**Design question it answers:** Does the grouping/alignment of the data make an unequal split obvious at a glance, without needing labels explained?

**Content:**
- Per-person breakdown across the whole group: total games claimed, and marquee/rivalry games claimed specifically, shown side-by-side (e.g., simple horizontal bars or counters per person, aligned so imbalance is visually obvious).
- Waitlist positions do NOT count toward these numbers — only actual claimed games.
- Clear, obvious way back to the Season Overview (Screen 1) from this screen.

## Cross-Screen Requirements
- All three screens must have obvious navigation back to the Season Overview (landing screen).
- The three screens should look like one product — consistent color palette, type, and spacing (nothing fancy needed, just consistent).
- Group related information visually using Gestalt principles (proximity, similarity, alignment) rather than relying on labels/text to explain relationships.

## Tone / Style Preferences
- Clean, modern sports-app feel — think more "ESPN app" than "spreadsheet." Bold use of a single accent color (a fictional team color) is welcome for status/rivalry flags.
- Prioritize clarity and glanceability over decoration. This is a mock-up meant to test comprehension, not a finished visual design system — skip elaborate component libraries, design tokens, or illustrations.
- Sample data should feel real: use a fictional but plausible team name, 3-5 friend names, and a partial season schedule (10-15 games is plenty) with a few games clearly flagged as rivalry/marquee.

## What NOT to build
- No login/auth, no real backend, no persistence beyond the session.
- No settings screen, no onboarding flow, no additional screens beyond the three above.
- No polished design system, custom component library, or reusable design tokens — consistent enough to look like one product is the bar.