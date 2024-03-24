import { init, FarcasterUserERC20BalancesInput, FarcasterUserERC20BalancesOutput, FarcasterUserERC20BalancesOutputData, TokenBlockchain, getFarcasterUserERC20Balances, fetchQuery } from "@airstack/frames";
import { NextApiRequest, NextApiResponse } from "next";

init(process.env.AIRSTACK_API_KEY || "");

// req = HTTP incoming message, res = HTTP server response
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let tokens: (FarcasterUserERC20BalancesOutputData | null)[] = [];

    const fid = req.query?.fid;

    console.log("fid", fid);
    try {
        if (fid) {
            var query = `query FarcasterERC20Balances {
                TokenBalances(
                  input: {filter: {owner: {_eq: "fc_fid:${fid}"}, tokenType: {_eq: ERC20}}, blockchain: base, limit: 50}
                ) {
                  TokenBalance {
                    tokenAddress
                    amount
                    token {
                      name
                      symbol
                      isSpam
                      totalSupply
                      decimals
                    }
                    formattedAmount
                  }
                }
              }`;
            console.time("token");
            const {
                data,
                error
            } = await fetchQuery(
                query
            );
            console.timeEnd("token");
            if (data?.TokenBalances?.TokenBalance) {
                const filter = data?.TokenBalances?.TokenBalance.filter((x: any) => !x.token.isSpam).slice(0, 8);
                return res.status(200).json(filter);
            }
            else {
                return res.status(200).json([]);
            }

        } else {

            return res.status(200).json([]);
        }


    } catch (error) {

        console.log(error);
    }
}