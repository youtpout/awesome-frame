/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../frames";
import { acceptedProtocols } from "../../utils";

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
    accepts: acceptedProtocols
  };
});

export const POST = handleRequest;
