/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";

const defaultAddress = "0x20fe51a9229eef2cf8ad9e89d91cab9312cf3b7a";

const handleRequest = frames(async (ctx) => {

  console.log("context", ctx);

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
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
