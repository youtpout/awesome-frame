/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../frames";
import { acceptedProtocols } from "../../utils";

const totalPages = 5;

const handleRequest = frames(async (ctx) => {

  console.log("message degen", ctx.message);

  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex"> Transaction submitted! </div>
          <div tw="flex">
            {ctx.message.transactionId.slice(0, 10)}...
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/"
        >
          ← back
        </Button>,
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View tx base/optimism
        </Button>,
        <Button
          action="link"
          target={`https://arbiscan.io/tx/${ctx.message.transactionId}`}
        >
          View tx arbitrum
        </Button>,
      ],
    };
  }


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
        post_url="/degen"
      >
        Base
      </Button>,
      <Button
        action="tx"
        target="/degen/buy"
        post_url="/degen"
      >
        Optimism
      </Button>,
      <Button
        action="tx"
        target="/degen/buy"
        post_url="/degen"
      >
        Arbitrum
      </Button>
    ],
    accepts: acceptedProtocols
  };
});

export const POST = handleRequest;
