import { init, FarcasterUserERC20BalancesInput, FarcasterUserERC20BalancesOutput, FarcasterUserERC20BalancesOutputData, TokenBlockchain, getFarcasterUserERC20Balances } from "@airstack/frames";
import { NextApiRequest, NextApiResponse } from "next";

init(process.env.AIRSTACK_API_KEY || "");

// req = HTTP incoming message, res = HTTP server response
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let tokens: (FarcasterUserERC20BalancesOutputData | null)[] = [];

    const fid = req.query?.fid;

    console.log("fid", fid);
    try {
        if (fid) {
            const input: FarcasterUserERC20BalancesInput = {
                fid: Number(fid),
                chains: [
                    TokenBlockchain.Ethereum,
                    TokenBlockchain.Base
                ],
                limit: 8,
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
            console.log("tokens length", tokens.length);
            return res.status(200).json(tokens);
        } else {

            return res.status(200).json([]);
        }

        var query = `query MyQuery {
    Base: Tokens(
      input: {filter: {isSpam: {_eq: false}, type: {_eq: ERC20}}, limit: 8 ,blockchain: base}
    ) {
      Token {
        isSpam
        address
        name
        symbol
        type
      }
      pageInfo {
        hasNextPage
        hasPrevPage
        nextCursor
        prevCursor
      }
    }
  }`;
    } catch (error) {

        console.log(error);
    }
}