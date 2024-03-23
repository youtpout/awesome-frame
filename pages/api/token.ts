import { init, FarcasterUserERC20BalancesInput, FarcasterUserERC20BalancesOutput, FarcasterUserERC20BalancesOutputData, TokenBlockchain, getFarcasterUserERC20Balances } from "@airstack/frames";


// req = HTTP incoming message, res = HTTP server response
export default async function handler(req, res) {
    let tokens: (FarcasterUserERC20BalancesOutputData | null)[] = [];

    init(process.env.AIRSTACK_API_KEY || "");
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

        res.status(200).json(tokens);
    } catch (error) {

        console.log(error);
    }
}