import Link from "next/link";
import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <header className="flex h-20 sticky top-0 w-full bg-red-200">
      <div className="float-left text-5xl text-blue-300">
        NJJ NFT MarketPlace
      </div>
      <div className="float-right flex justify-around pr-10">
        <div>
          <Link href="/">Buy NFT</Link>
        </div>
        <div>
          <Link href="/list">Sell NFT</Link>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
}
