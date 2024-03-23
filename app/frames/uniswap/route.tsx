/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import {
  init, getFarcasterUserERC20Balances,
  FarcasterUserERC20BalancesInput,
  FarcasterUserERC20BalancesOutput,
  TokenBlockchain,
  FarcasterUserERC20BalancesOutputData,
} from "@airstack/frames";
import { frames } from "../frames";

init(process.env.AIRSTACK_API_KEY || "");
const totalPages = 5;

const handleRequest = frames(async (ctx) => {
  


  return {
    image: (
      <div tw="flex flex-col">
       Uniswap test
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target="/"
      >
        ← back
      </Button>
    ],
  };
});

export const POST = handleRequest;
