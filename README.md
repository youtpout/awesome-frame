# Project Description

A frame to manage your portfolio on base:

You can manage your ERC20 on base, buy more or sell it on uniswap get token info,
Buy degen token from arbitrum/base/optimism directly from the app with ethreume
See trend token on base, see information about it and buy it on uniswap.

## How it's Made

Built from frame.js template with nextjs, implements the openframe standard. I use airstack to retrieve user balance and trend token on base from next router api I use onthis.xyz shortcut to swap Degen token from optimism/base/arbitrum. Tested on warpcast developer frames with trust wallet.

## Quickstart

If running from the frames.js repository itself:

- Run `yarn` from the repository root
- Run `cd examples/framesjs-starter`

1. Install dependencies `yarn install`

2. Run the dev server `yarn dev`

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. Edit `app/page.tsx`

5. Visit [http://localhost:3000/debug](http://localhost:3000/debug) to debug your frame.

6. (Optional) To use a real signer (costs warps), copy `.env.sample` to `.env` and fill in the env variables following the comments provided

## Docs, Questions and Help

- [Frames.js Documentation](https://framesjs.org)
- [Awesome frames](https://github.com/davidfurlong/awesome-frames?tab=readme-ov-file)
- Join the [/frames-dev](https://warpcast.com/~/channel/frames-devs) channel on Farcaster to ask questions

## If you get stuck or have feedback, [Message @df please!](https://warpcast.com/df)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy

```bash
vercel
```

more deployment links coming soon, PRs welcome!