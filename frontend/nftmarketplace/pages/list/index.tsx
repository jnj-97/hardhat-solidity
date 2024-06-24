export default function Index() {
  async function listNFT(e: any) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        listNFT(e);
      }}
      className="w-full"
    >
      <h1 className="text-center font-bold text-2xl">Sell NFT</h1>
      <label>NFT Address</label>
      <input type="text" className="pt-10 rounded-lg" />
      <button className="bg-green-200 rounded-lg pt-10">Sell</button>
    </form>
  );
}
