# Little Memory Booth

A single-page romantic anniversary scrapbook/photo-booth site built with HTML, CSS, JavaScript, Anime.js, and Intersection Observer. It is ready for GitHub Pages, Netlify, or Vercel.

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
- `photoStrips` captions and four photos per strip
- `reasonsILoveYou`
- `loveLetter`
- `finalMessage`
- `musicPath`
- `easterEggMessages`

The hidden straw-hat/secret-photo trigger was intentionally removed so the intro cannot be blocked by an accidental modal.

Also replace image `alt` placeholder text in `index.html` if you want highly specific descriptions.

## Adding photos and music

- Put photos in `assets/photos/`. WebP or AVIF is recommended, with JPG/PNG also supported.
- Hero/final photos: around 1600×1200 or similar.
- Timeline square photos: 800×800 or larger.
- Photo strip photos: 900×675 or similar 4:3 crops.
- Put music in `assets/audio/` and set `musicPath` in `script.js`. Music does not autoplay; visitors must press **Play our song**.

## Testing locally

From this folder run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173` in a browser. Use DevTools mobile emulation to check phone layouts.

## Deploying

### GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Choose your branch and `/root` as the source.
4. Save and wait for the Pages URL.

### Netlify

1. Drag this folder into Netlify Drop, or connect the GitHub repo.
2. Build command: leave blank.
3. Publish directory: `.`.

### Vercel

1. Import the GitHub repo in Vercel.
2. Framework preset: **Other**.
3. Build command: leave blank.
4. Output directory: `.`.

## Animation notes

- Intro timeline: clouds drift, ducks waddle in, monkey swings, heading letters stagger, and curtains slide open.
- Hero timeline: the main image develops from blurred/soft to sharp with a gentle flash.
- Scroll reveals: Intersection Observer triggers timeline cards, food assembly, map trail drawing, and envelope movement.
- Gallery interactions: strips rise on hover, tap opens a modal, and **Take Another Look** shuffles strips with a flash.
- Easter eggs: duck clicks, monkey click, chocolate drop, LOVE keyboard code, peelable photo corner, treasure-map X, and chest click.
- Reduced motion: `prefers-reduced-motion` disables or simplifies major animations.
