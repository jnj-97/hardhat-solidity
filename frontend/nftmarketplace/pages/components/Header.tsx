import Link from "next/link";
import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <header className="flex h-20 sticky top-0 w-full items-center bg-blue-950">
      <div className="text-5xl text-blue-300 pl-10 font-thin">
        NJJ NFT MarketPlace
      </div>
      <div className=" flex items-center text-2xl pl-20 justify-around pr-10">
        <div>
          <Link href="/">Buy NFT</Link>
        </div>
        {/* <div className="pl-20">
          <Link href="/list">Sell NFT</Link>
        </div> */}
        <div className="pl-20">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
