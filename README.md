# VaultFootage (MVP)
Static MVP for the VaultFootage AI Stock Footage Vault.
- Hosting: Vercel (https://vault-footage-l3c5.vercel.app)
- Stack: HTML/CSS/JS (no build step)
- Folder structure: /clips for previews, /vaults for upcoming niches.
Deploys automatically on push to main.

## Commerce via Gumroad
- Checkout is handled entirely by Gumroad overlay, no server/runtime required.
- Gumroad scripts are loaded in `index.html` and `pricing.html` and wired through `scripts/gumroad.js`.
- Delete any legacy `STRIPE_*` environment variables in Vercel after verifying production.

### Add a new product CTA
1. Create the product on Gumroad and copy its slug (the part after `/l/`).
2. Optionally add the slug mapping in `scripts/gumroad.js` if you want to use a shorthand key.
3. Use an anchor with `gumroad-button`, for example:
   ```html
   <a class="btn gold gumroad-button" data-gumroad="luxury01">Buy on Gumroad</a>
   ```
4. The overlay will open automatically; fallback opens a new tab if the popup is blocked.

Redeploy trigger: 2025-10-29T12:02:29Z
