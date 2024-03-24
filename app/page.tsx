import Link from "next/link";
import { currentURL, vercelURL } from "./utils";
import { createDebugUrl } from "./debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio",
    description: "Manage your portfolio",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          vercelURL() || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/");

  console.log("vercel", vercelURL());
  console.log("currentURL", url);
  return (
    <div>
      Welcome to awesome-frame, integrate this url in compatible protocol to show the frame
    </div>
  );
}
