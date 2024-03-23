/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

const defaultAddress = "0x20fe51a9229eef2cf8ad9e89d91cab9312cf3b7a";

const handleRequest = frames(async (ctx) => {

  console.log(ctx);

  return {
    image: (
      <div tw="flex flex-col">
        <div>ERC20</div>
        <div>Uniswap Liquidities</div>
        <div>Trend tokens</div>
        <div>Connect Wallet</div>
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
        target="/tokens"
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
