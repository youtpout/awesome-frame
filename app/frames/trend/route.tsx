/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

import { frames } from "../frames";
import { vercelURL } from "../../utils";
import { FarcasterUserERC20BalancesOutputData } from "@airstack/frames";
import { getPreviousFrame } from "frames.js/next/server";


const totalPages = 5;

const handleRequest = frames(async (ctx) => {
  try {
    let tokens: any[] = [];

    var url = new URL(
      "/api/trend",
      vercelURL() || "http://localhost:3000"
    )

    console.log("searchParams", ctx.searchParams);

    const callApi = await fetch(url);
    tokens = await callApi.json();
    console.log("trend getted", tokens);

    var data = JSON.stringify(tokens);

    const listItems = tokens.filter(x => x?.token?.isSpam === false).map((data, index) =>
      <div key={index} tw="flex flex-row"> <span tw="ml-5">{index + 1}</span> <span tw="ml-5">{data?.token?.name}</span></div>
    );


    return {
      image: (
        <div tw="flex flex-col">
          <span tw="text-blue-500 mb-5">Last 24h Trending token on base for farcaster user</span>
          <div tw="flex flex-col">
            {listItems}
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
          action="post"
          target={{ query: { tokens: data }, pathname:'/trend/buy' }}
        >
          Buy
        </Button >
      ],
      textInput: "Select token number",
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
