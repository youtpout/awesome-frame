/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);

  
  return {
    image: (
      <div tw="flex flex-col">
        My tokens
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        ←
      </Button>,
      <Button
        action="post"
        target={{
          query: { pageIndex: (pageIndex + 1) % totalPages },
        }}
      >
        →
      </Button>,
    ],
    textInput: "Type something!",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
