/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../../frames";
import { acceptedProtocols } from "../../../utils";
import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { ethers } from "ethers";

export async function POST(
  req: NextRequest
): Promise<NextResponse<any>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);
  console.log("frameMessage", frameMessage);

  if (!frameMessage?.inputText) {
    throw new Error("No amount");
  }

  let address = "0x17b217d4b29063c96d59d5a54211582bee9cfb0d";
  let chainId = "8453";
  if (frameMessage.buttonIndex === 2) {
    address = "0x17b217d4b29063c96d59d5a54211582bee9cfb0d";
    chainId = "8453";
  } else if (frameMessage.buttonIndex === 3) {
    address = "0xe24a513c4489589b6af5fb84154f9ddb17d08d2f";
    chainId = "10";
  }
  else if (frameMessage.buttonIndex === 4) {
    address = "0xa68ed47bdc0c72b5ddde63fb9295f336ec9541b8";
    chainId = "42161";
  }
  else {
    throw new Error("Invalid button");
  }

  const amount = ethers.parseEther(frameMessage.inputText!);

  return NextResponse.json({
    chainId: "eip155:" + chainId, // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      to: address,
      data: "",
      value: amount.toString()
    },
  });
}