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
          💲Buy Degen from anychain
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
    textInput: "Amount in ETH",
    buttons: [
      <Button
        action="post"
        target="/"
      >
        ← back
      </Button>,
      <Button
        action="tx"
        target="/degen/buy"
      >
        Base
      </Button>,
      <Button
        action="tx"
        target="/degen/buy" >
        Optimism
      </Button>,
      <Button
        action="tx"
        target="/degen/buy"
      >
        Arbitrum
      </Button>
    ],
    accepts: acceptedProtocols
  };
});

export const POST = handleRequest;
