/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../frames";
import { acceptedProtocols } from "../../utils";

const totalPages = 5;

const handleRequest = frames(async (ctx) => {



  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex mb-5 text-blue-500 text-7xl font-bold">
          💲Buy Degen from multichain to base
        </div>
        <div>
          1 Buy from Base
        </div>
        <div>
          2 Buy from Optimism
        </div>
        <div>
          3 Buy from Arbitrum
        </div>
      </div>
    ),
    textInput:"Amount in ETH",
    buttons: [
      <Button
        action="post"
        target="/"
      >
        ← back
      </Button>,
      <Button
        action="post"
        target={{ query: { address: "0x17b217d4b29063c96d59d5a54211582bee9cfb0d", chainId :"8453" }, pathname: '/degen/buy' }}
      >
        Base
      </Button>,
      <Button
        action="post"
        target={{ query: { address: "0xe24a513c4489589b6af5fb84154f9ddb17d08d2f", chainId :"10"  }, pathname: '/degen/buy' }}
      >
        Optimism
      </Button>,
      <Button
        action="post"
        target={{ query: { address: "0xa68ed47bdc0c72b5ddde63fb9295f336ec9541b8", chainId :"42161"  }, pathname: '/degen/buy' }}
      >
        Arbitrum
      </Button>
    ],
    accepts: acceptedProtocols
  };
});

export const POST = handleRequest;
