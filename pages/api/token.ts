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
                limit: 10,
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

        /* res.status(200).json([{
             blockchain: 'ethereum',
             tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
             amount: 125,
             amountInWei: '125000000',
             name: 'USD Coin',
             symbol: 'USDC'
         },
         {
             blockchain: 'ethereum',
             tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
             amount: 0.001,
             amountInWei: '1000000000000000',
             name: 'Wrapped Ether',
             symbol: 'WETH'
         },
         {
             blockchain: 'polygon',
             tokenAddress: '0x10503dbed34e291655100a3c204528425abe3235',
             amount: 750,
             amountInWei: '750000000000000000000',
             name: 'am00r',
             symbol: 'AM00R'
         },]);*/
    } catch (error) {

        console.log(error);
    }
}