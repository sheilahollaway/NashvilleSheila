# Nashville Sheila

Website for Sheila Hollaway, Benchmark Realty, serving Nashville and Hendersonville, Tennessee.

## Included
- Separate Home, Buy, Sell, Listings, About, Contact, Search, and Guides pages.
- Original branding, photography, and buyer/seller PDF guides.
- RealScout search, home-value, personal listings, and office listings widgets.
- WordPress classic theme templates and a static local preview.

## Preview
Install Node.js, then run from the repository root:

```sh
node website/preview.cjs
```

Open http://127.0.0.1:4173/. Stop the server with Ctrl+C.

## Prepare the WordPress theme
Edit the HTML pages and style.css, then regenerate the PHP templates:

```sh
node website/prepare.cjs
```

The build validates local links/assets and creates website/package/nashville-sheila.
Zip that folder and install it through WordPress Appearance > Themes.
In PowerShell:

```powershell
Compress-Archive -Path website/package/nashville-sheila -DestinationPath website/nashville-sheila-theme.zip -Force
```

The theme creates missing Buy, Sell, Listings, About, Contact, Search, and Guides pages on activation. Existing pages are not overwritten. Content is maintained in the source files, not the WordPress block editor. The bundled PDF guides make the archive approximately 60 MB; host upload limits may require file-manager installation.

## RealScout
Widgets use Sheila's public embed identifier and branded search links. No credentials are included. Registration is configured in RealScout to allow 10 unique listing views before signup; this account setting is not controlled by this repository.

## Launch status
This is the reviewed local design, not a deployed production WordPress installation. WordPress runtime testing, hosting setup, privacy/disclosure review, redirects, and domain connection remain. Preserve existing contacts and domain email records before ending existing services.

GitHub stores the source. GitHub Pages can serve the static HTML version but cannot run the WordPress PHP theme.

## Assets
Photos, logo, and guides were supplied by the site owner. See website/CONTENT-SOURCES.txt for content provenance. No license to reuse these assets is granted by this repository.

## AWS Amplify automatic publishing (prepared, not connected yet)
The root amplify.yml builds a static deployment with:
- Build command: node website/build-static.cjs
- Output directory: dist
- Source branch: main

In AWS Amplify, create a Hosting app, connect GitHub, grant access only to this repository, and select main. Use the repository build configuration and the Standard build instance. No backend, database, environment secrets, or WordPress server is required. Keep automatic branch deployment enabled. Each push to main will publish after the build succeeds.

Do not add a single-page-app catch-all rewrite: this website has separate HTML pages. Review the initial amplifyapp.com deployment, including listing cards, search, home value, guides, and mobile navigation before attaching NashvilleSheila.com. The design-preview notice is intentionally retained until launch checks are complete.

Add the custom domain using Amplify's domain wizard; keep domain registration at GoDaddy and enter the verification/routing DNS records AWS provides. Preserve mail records. Do not cancel the existing host until the custom domain and HTTPS are verified.

Current published pay-as-you-go rates (checked October 16, 2026): Standard builds $0.01/minute, data served $0.15/GB, storage $0.023/GB-month. Free-tier eligibility/credits depend on the account. Domain renewal and taxes are separate. A billing alert is recommended; it is not a spending cap.
