/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../frames";
import { acceptedProtocols } from "../../utils";

const totalPages = 5;

const handleRequest = frames(async (ctx) => {



  return {
    image: (
      <div tw="flex flex-col">
        Bridge your eth directly
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
