# AS Detail

Source code for [asdetail.pt](https://asdetail.pt).

## Run locally

```bash
npm install
npm run dev
```

Vercel normally serves the site at `http://localhost:3000`.

## Deploy to production

```bash
npm run deploy
```

## Layout

The site is a static single-page website.

| Path | What it is |
| --- | --- |
| `index.html` | The whole page, including the `LocalBusiness` and `FAQPage` structured data |
| `styles.css` | All styling |
| `script.js` | Service tabs and the WhatsApp booking form |
| `404.html` | Custom not-found page |
| `assets/` | Logo, favicons and the social share image |
| `asdetail-site/` | Before-and-after photographs |
| `vercel.json` | Clean URLs, cache headers and security headers |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Search engine and install metadata |

## Brand assets

`assets/logo.svg` is the source of truth for the logo. The PNGs beside it
(`logo.png`, `og-image.png`, `icon-*.png`, `favicon-32.png`,
`apple-touch-icon.png`) are rendered from it and from the share-card layout, so
regenerate them rather than editing them by hand.

The wordmark relies on a condensed display face that is not available on every
platform, which is why the logo is shipped as PNG everywhere it appears in the
page instead of as inline SVG.

## Changing prices

Prices appear in three places and all three must be kept in step:

1. the service cards and the `.pricelist` rows in `index.html`
2. the `<select id="servico">` options in the booking form
3. the `hasOfferCatalog` block in the `LocalBusiness` structured data
