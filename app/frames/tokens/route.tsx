/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

import { frames } from "../frames";
import { vercelURL } from "../../utils";
import { FarcasterUserERC20BalancesOutputData } from "@airstack/frames";


const totalPages = 5;

const handleRequest = frames(async (ctx) => {
  try {
    let tokens: (FarcasterUserERC20BalancesOutputData | null)[] = [];


    console.log("message", ctx.message);

    var url = new URL(
      "/api/token",
      vercelURL() || "http://localhost:3000"
    )
    const callApi = await fetch(url);
    tokens = await callApi.json();
    console.log("tokens", tokens);

    const listItems = tokens.map((data) =>
      <li key={data?.tokenAddress}>{data?.name}</li>
    );


    return {
      image: (
        <div tw="flex flex-col">
          <ul tw="flex flex-col">
            {listItems}
          </ul>
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
      textInput: "Action",
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
          Didnt work
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
