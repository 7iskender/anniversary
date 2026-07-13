# Little Memory Booth

A single-page romantic anniversary scrapbook/photo-booth site built with HTML, CSS, JavaScript, and Intersection Observer. For now, just open `index.html` directly in your browser while you customize it; the buttons do not depend on a localhost server or an external animation CDN.

## Suggested folder structure

```text
index.html
styles.css
script.js
assets/
  photos/   # Replace SVG placeholders with your photos
  audio/    # Add our-song.mp3 or update musicPath
  icons/    # Optional custom doodles/icons
```

## Personalization checklist

Edit the `anniversaryData` object near the top of `script.js`:

- `coupleNames`
- `anniversaryDate`
- `heroPhoto`
- `heroMessage`
- `memories` dates, titles, text, decorations, and photo paths
- `firstDateStops` text and placeholder photo paths for Princeton, the Turkish store, the Asian store, and Mercer Park
- `photoStrips` captions and four photos per strip
- `loveLetter`
- `finalMessage`
- `musicPath`

The hidden straw-hat/secret-photo trigger was intentionally removed so the intro cannot be blocked by an accidental modal.

Also replace image `alt` placeholder text in `index.html` if you want highly specific descriptions.

## Adding photos and music

- Put photos in `assets/photos/`. WebP or AVIF is recommended, with JPG/PNG also supported.
- Hero/final photos: around 1600×1200 or similar.
- Timeline square photos: 800×800 or larger.
- Photo strip photos: 900×675 or similar 4:3 crops.
- Put music in `assets/audio/` and set `musicPath` in `script.js`. Music does not autoplay; visitors must press **Play our song**.

## Opening it while editing

Open `index.html` directly in your browser. No localhost server, deployment setup, backend, or build step is needed while you are editing the surprise.

## Animation notes

- Intro timeline: clouds drift, ducks waddle in, monkey swings, and curtains slide open without title text on top. The curtain has a built-in browser animation fallback so it still works when opened from a downloaded folder.
- Hero timeline: the main image develops from blurred/soft to sharp with a gentle flash.
- Tabs: First date map, Photos, and Letter keep the page cleaner while preserving the booth animation.
- Scroll reveals: Intersection Observer triggers timeline cards, food assembly, and envelope movement.
- Gallery interactions: strips rise on hover, tap opens a modal, and **Take Another Look** shuffles strips with a flash.
- Easter eggs/interactions: duck quack animation, monkey wiggle, chocolate drop, LOVE keyboard hearts, peelable photo corner, and photo-strip modal.
- Reduced motion: `prefers-reduced-motion` disables or simplifies major animations.
