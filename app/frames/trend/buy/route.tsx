/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../../frames";
import { acceptedProtocols } from "../../../utils";


const handleRequest = frames(async (ctx) => {
  try {
    let tokens: any[] = JSON.parse(ctx.searchParams.tokens || "[]");

    let id = Number(ctx.message?.inputText);

    let selectedToken;
    let supply: BigInt = BigInt(0);
    if (tokens?.length && id) {
      selectedToken = tokens[(id - 1)];
      console.log(selectedToken);
      supply = BigInt(selectedToken.token.totalSupply) / BigInt(10 ** selectedToken.token.decimals);
      console.log("supply", supply);
    }

    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex mb-5 text-blue-500 text-7xl font-bold">
            🔥 Buy trending token
          </div>
          <div tw="flex">
            Name : {selectedToken.token.name}
          </div>
          <div tw="flex">
            Symbol : {selectedToken.token.symbol}
          </div>
          <div tw="flex">
            Decimals : {selectedToken.token.decimals}
          </div>
          <div tw="flex">
            Supply : {supply.toString()}
          </div>
          <div tw="flex">
            Holders : {selectedToken.uniqueHolders}
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/trend"
        >
          ← back
        </Button>,
        <Button
          action="post"
          target="/"
        >
          🏠 Home
        </Button>,
        <Button
          action="link"
          target={`https://app.uniswap.org/#/swap?outputCurrency=${selectedToken.address}&chain=base`}
        >
          Buy on uniswap
        </Button >
      ],
      accepts: acceptedProtocols
    };
  } catch (error) {
    console.log(error);

    return {
      image: (
        <div tw="flex flex-col">
          Incorrect selection
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/trend"
        >
          ← back
        </Button>,
        <Button
          action="post"
          target="/"
        >
          🏠 Home
        </Button>

      ],
      textInput: "Action",
      accepts: acceptedProtocols
    };
  }


});

export const POST = handleRequest;
