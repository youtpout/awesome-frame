/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

import { frames } from "../frames";
import { vercelURL } from "../../utils";
import { FarcasterUserERC20BalancesOutputData } from "@airstack/frames";


const totalPages = 5;

const handleRequest = frames(async (ctx) => {
  try {
    let tokens: any[] = [];

    let fid: number | undefined = ctx.message?.requesterFid;

    console.log("message", ctx.message);

    var url = new URL(
      "/api/token?fid=" + fid,
      vercelURL() || "http://localhost:3000"
    )
    console.log("called url",url);
    const callApi = await fetch(url);
    tokens = await callApi.json();
    console.log("tokens getted", tokens.length);

    var data = JSON.stringify(tokens);

    const listItems = tokens.map((data, index) =>
      <div key={index} tw="flex flex-row"> <span tw="ml-5">{index + 1}</span> <span  tw="ml-5">{data?.formattedAmount} {data?.token?.symbol}</span> <span  tw="ml-5">{data?.token?.name}</span></div>
    );


    return {
      image: (
        <div tw="flex flex-col">
          <span tw="text-blue-500 mb-5">Set token number and click and more info to manage it</span>
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
          target={{ query: { tokens: data }, pathname:'/tokens/manage' }}
        >
          Manage
        </Button>
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
