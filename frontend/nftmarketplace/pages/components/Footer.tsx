export default function Footer() {
  return (
    <footer className="bg-white font-thin text-center text-lg text-gray-700">
      <p>
        Created by{" "}
        <a href="https://www.linkedin.com/in/nobin-johnson/">Nobin Johnson</a>
      </p>
      <p>
        &#169;{new Date().getFullYear().toString()}{" "}
        <a href="https://puffles.io">Puffles</a>
      </p>
    </footer>
  );
}
