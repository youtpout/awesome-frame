/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";
import { getFrameMessage, getPreviousFrame } from "frames.js/next/server";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";

const defaultAddress = "0x20fe51a9229eef2cf8ad9e89d91cab9312cf3b7a";

const handleRequest = frames(async (ctx) => {

  console.log("message", ctx.message);

  console.log("disco", ctx.searchParams);

  // do some logic to determine the next frame

  let name = ctx.message?.requesterUserData?.displayName;

  if (ctx.searchParams.disconnect === 'true') {
    name = "";
  }


  if (!name) {
    return {
      headers: {
        // Max cache age of 5 seconds
        "Cache-Control": "max-age=5",
      },
      image: (
        <div tw="flex flex-col">
          ⚡ Connect your account to manage your portfolio on base
        </div>
      ),
      buttons: [<Button
        action="post"
        target={{ query: { disconnect: 'false' } }}
      >
        Connect
      </Button>],
      accepts: [{
        id: 'farcaster',
        version: 'vNext'
      }, {
        id: 'xmtp',
        version: 'vNext'
      }],
    };
  }

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex flex-col">
          <div tw="flex mb-5 text-blue-500 text-7xl font-bold">Welcome {name}</div>
          <div>💰 ERC20</div>
          <div>🦄 Uniswap positions</div>
          <div>🔥 Trend tokens</div>
        </div>
      </div>
    ),
    buttons: [<Button
      action="post"
      target="/tokens"
    >
      ERC20
    </Button>,
    <Button
      action="post"
      target="/uniswap"
    >
      Uniswap
    </Button>,
    <Button
      action="post"
      target="/tokens"
    >
      trend
    </Button>],
    accepts: [{
      id: 'farcaster',
      version: 'vNext'
    }, {
      id: 'xmtp',
      version: 'vNext'
    }],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
