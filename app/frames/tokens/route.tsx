/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { init } from "@airstack/frames";

init(process.env.AIRSTACK_API_KEY || "");
const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);


  return {
    image: (
      <div tw="flex flex-col">
        <div>Token1</div>
        <div>Token2</div>
        <div>Token3</div>
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
        action="post"
        target="{{
          query: { token: 1 },
        }}"
      >
        Token 1
      </Button>,
      <Button
        action="post"
        target="{{
        query: { token: 1 },
      }}"
      >
        Token 2
      </Button>,
      <Button
        action="post"
        target="{{
      query: { token: 2 },
    }}"
      >
        Execute
      </Button>,
    ],
    textInput: "Action",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
