This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

17.03.2026: Added Cubtale for deployment

## Sticky bar country targeting

The pump offer appears only when Vercel identifies the visitor's IP country as `US`.
`/api/visitor-country` reads Vercel's `x-vercel-ip-country` request header and returns
only the offer eligibility flag, with `Cache-Control: private, no-store`. The homepage
stays statically generated. This needs no IP database, API key, browser location
permission, or third-party lookup service. Normal Vercel function usage applies.

Other countries, absent headers, and lookup failures/timeouts get the original
Cubtale download bar with its AppsFlyer link generation and fallback URL. The pump
component retains the previous AppsFlyer code as a comment. While detection is
pending, page space is reserved and neither CTA flashes; visitors without JavaScript
get the download bar. Localhost has no Vercel country header, so it defaults to the
download bar. IP geolocation follows the visitor's public IP, including a VPN exit.

To check targeting locally, send `x-vercel-ip-country: US` or another country code
to `/api/visitor-country` using curl. Test both request orders to confirm that a US
response cannot be reused for another country. The real Vercel geolocation header
is supplied automatically on deployments.
