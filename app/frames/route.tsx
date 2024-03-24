/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";
import { acceptedProtocols } from "../utils";

const handleRequest = frames(async (ctx) => {

  console.log("message", ctx.message);

  console.log("disco", ctx.searchParams);

  // do some logic to determine the next frame

  let name = ctx.message?.requesterUserData?.displayName;

  if (ctx.searchParams.disconnect === 'true') {
    name = "";
  }


  if (!name) {
    return {
      headers: {
        // Max cache age of 5 seconds
        "Cache-Control": "max-age=5",
      },
      image: (
        <div tw="flex flex-col">
          ⚡ Connect your account to manage your portfolio on base
        </div>
      ),
      buttons: [<Button
        action="post"
        target={{ query: { disconnect: 'false' } }}
      >
        Connect
      </Button>],
      accepts: acceptedProtocols,
    };
  }

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex flex-col">
          <div tw="flex mb-5 text-blue-500 text-7xl font-bold">Welcome {name}</div>
          <div>🪙 Manage ERC20</div>
          <div>💲 Buy Degen</div>
          <div>🔥 Trend tokens</div>
        </div>
      </div>
    ),
    buttons: [<Button
      action="post"
      target="/tokens"
    >
      🪙 ERC20
    </Button>,
    <Button
      action="post"
      target="/degen"
    >
      💲 Degen
    </Button>,
    <Button
      action="post"
      target="/trend"
    >
      🔥 Trend
    </Button>],
    accepts: acceptedProtocols,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
