import { init, fetchQuery } from "@airstack/frames";
import { NextApiRequest, NextApiResponse } from "next";

init(process.env.AIRSTACK_API_KEY || "");

// req = HTTP incoming message, res = HTTP server response
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    var query = `query MyQuery {
      TrendingTokens(
        input: {transferType: all, timeFrame: one_day, audience: farcaster, blockchain: base, criteria: total_transfers, limit :8}
      ) {
        TrendingToken {
          address
          audience
          blockchain
          chainId
          criteria
          criteriaCount
          id
          token {
            address
            isSpam
            name
            totalSupply
            symbol
            decimals
          }
          uniqueHolders
        }
      }
    }`;

    const { data, error } = await fetchQuery(query);

    if (data?.TrendingTokens?.TrendingToken) {
      return res.status(200).json(data.TrendingTokens.TrendingToken);
    }
    else {
      return res.status(200).json([]);
    }

  } catch (error) {
    console.error(error);
    return res.status(200).json([]);
  }


}