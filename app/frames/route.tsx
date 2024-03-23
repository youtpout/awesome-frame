/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";
import { getFrameMessage, getPreviousFrame } from "frames.js/next/server";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";

const defaultAddress = "0x20fe51a9229eef2cf8ad9e89d91cab9312cf3b7a";

const handleRequest = frames(async (ctx) => {

  console.log("message", ctx.message);

  const previousFrame = getPreviousFrame(ctx.searchParams);

  // do some logic to determine the next frame

  let fid: number | undefined;
  let walletAddress: string | undefined;

  if (
    previousFrame.postBody &&
    isXmtpFrameActionPayload(previousFrame.postBody)
  ) {
    const frameMessage = await getXmtpFrameMessage(previousFrame.postBody);
    walletAddress = frameMessage?.verifiedWalletAddress;
  } else {
    const frameMessage = await getFrameMessage(previousFrame.postBody);
    if (frameMessage && frameMessage?.isValid) {
      fid = frameMessage?.requesterFid;
      walletAddress =
        frameMessage?.requesterCustodyAddress.length > 0
          ? frameMessage?.requesterCustodyAddress
          : frameMessage.requesterCustodyAddress;
    }
  }

  console.log("walletAddress", walletAddress);


  const address = ctx.message?.inputText || defaultAddress;
  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex flex-row">Wallet : {address}</div>
        <div>💰 ERC20</div>
        <div>🦄 Uniswap Liquidities</div>
        <div>🔥 Trend tokens</div>
        <div>👛 Connect Wallet</div>
      </div>
    ),
    textInput: "Wallet address",
    buttons: [
      <Button
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
      >
        Connect
      </Button>,
    ],
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
