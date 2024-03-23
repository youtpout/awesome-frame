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

  let fid: number | undefined = ctx.message?.castId?.fid;
  let walletAddress: string | undefined;

  if (ctx.message?.requesterVerifiedAddresses?.length) {
    walletAddress = ctx.message.requesterVerifiedAddresses[0];
  } else {
    walletAddress = ctx.message?.requesterCustodyAddress;
  }

  let address = ctx.message?.inputText || walletAddress;

  if (ctx.searchParams.disconnect === 'true') {
    address = "";
  }


  if (!address) {
    return {
      headers: {
        // Max cache age of 5 seconds
        "Cache-Control": "max-age=5",
      },
      image: (
        <div tw="flex flex-col">
          👛 Connect your wallet to use the app or specify a wallet
        </div>
      ),
      textInput: "Wallet address",
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
        {address && <div tw="flex flex-col">
          <div tw="flex flex-row">Wallet : {address}</div>
          <div>💰 ERC20</div>
          <div>🦄 Uniswap Liquidities</div>
          <div>🔥 Trend tokens</div>
          <div>👛 Disconnect Wallet</div>
        </div>}
        {!address && <div tw="flex flex-row"> 👛 Connect your wallet to use the app or specify a wallet</div>}
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
    </Button>,
    <Button
      action="post"
      target={{ query: { disconnect: "true" } }}
    >
      Disconnect
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
