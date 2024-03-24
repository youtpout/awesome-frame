/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

import { frames } from "../../frames";
import { FarcasterUserERC20BalancesOutputData } from "@airstack/frames";
import { getPreviousFrame } from "frames.js/next/server";


const totalPages = 5;

const handleRequest = frames(async (ctx) => {
  try {
    let tokens: any[] = JSON.parse(ctx.searchParams.tokens || "[]");

    let id = Number(ctx.message?.inputText);

    let selectedToken;
    let supply: BigInt = BigInt(0);
    if (tokens?.length && id) {
      selectedToken = tokens[(id - 1)];
      console.log(selectedToken);
      supply = BigInt(selectedToken.token.totalSupply) / BigInt(10 ** selectedToken.token.decimals);
      console.log("supply", supply);
    }

    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex mb-5 text-blue-500 text-7xl font-bold">
            🛠️ Manage your token
          </div>
          <div tw="flex">
            Name : {selectedToken.token.name}
          </div>
          <div tw="flex">
            Amount : {selectedToken.formattedAmount}
          </div>
          <div tw="flex">
            Symbol : {selectedToken.token.symbol}
          </div>
          <div tw="flex">
            Decimals : {selectedToken.token.decimals}
          </div>
          <div tw="flex">
            Supply : {supply.toString()}
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/tokens"
        >
          ← back
        </Button>,
        <Button
          action="post"
          target="/"
        >
          🏠 Home
        </Button>,
        <Button
          action="link"
          target={`https://app.uniswap.org/#/swap?inputCurrency=${selectedToken.tokenAddress}&chain=base`}
        >
          Sell
        </Button >,
        <Button
          action="link"
          target={`https://app.uniswap.org/#/swap?outputCurrency=${selectedToken.tokenAddress}&chain=base`}
        >
          Buy more
        </Button >
      ],
      accepts: [{
        id: 'farcaster',
        version: 'vNext'
      }, {
        id: 'xmtp',
        version: 'vNext'
      }]
    };
  } catch (error) {
    console.log(error);

    return {
      image: (
        <div tw="flex flex-col">
          Incorrect selection
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/trend"
        >
          ← back
        </Button>,
        <Button
          action="post"
          target="/"
        >
          🏠 Home
        </Button>

      ],
      textInput: "Action",
      accepts: [{
        id: 'farcaster',
        version: 'vNext'
      }, {
        id: 'xmtp',
        version: 'vNext'
      }]
    };
  }


});

export const POST = handleRequest;
