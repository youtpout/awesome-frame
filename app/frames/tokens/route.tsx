/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import {
  init, getFarcasterUserERC20Balances,
  FarcasterUserERC20BalancesInput,
  FarcasterUserERC20BalancesOutput,
  TokenBlockchain,
  FarcasterUserERC20BalancesOutputData,
} from "@airstack/frames";

init(process.env.AIRSTACK_API_KEY || "");
const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);

  let tokens: (FarcasterUserERC20BalancesOutputData | null)[] = [];
  try {
    const input: FarcasterUserERC20BalancesInput = {
      fid: Number(process.env.FARCASTER_DEVELOPER_FID || 602),
      chains: [
        TokenBlockchain.Ethereum,
        TokenBlockchain.Polygon,
        TokenBlockchain.Base,
        TokenBlockchain.Zora,
      ],
      limit: 50,
    };
    console.time("token");
    const {
      data,
      error,
      hasNextPage,
      hasPrevPage,
      getNextPage,
      getPrevPage,
    }: FarcasterUserERC20BalancesOutput = await getFarcasterUserERC20Balances(
      input
    );
    console.timeEnd("token");
    tokens = data! || [];
    console.log(data);
  } catch (error) {

    console.log(error);
  }

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

export const POST = handleRequest;
