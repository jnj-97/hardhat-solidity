import Image from "next/image";

export default function NFTCard({
  image,
  name,
  description,
  price,
  owner,
}: {
  image: string;
  name: string;
  description: string;
  price: number;
  owner: string;
}) {
  return (
    <div className="w-72 flex h-96 bg-gradient-to-br from-pink-300 to-amber-500 rounded-lg border-teal-300">
      <Image alt={name} src={image} className="float-left" />
      <div className="float-right text-center">
        <h1 className="text-lg font-bold">{name}</h1>
        <p>{description}</p>
        {owner == "you" ? <p>{price.toString()}</p> : <></>}
        {owner == "you" ? <p>Owned by You</p> : <p>Owned by {owner}</p>}
      </div>
      {owner == "you" ? (
        <></>
      ) : (
        <button
          className="rounded-lg p-10 bg-green-500 text-lg"
          onClick={() => {}}
        >
          Buy
        </button>
      )}
    </div>
  );
}
