import Link from "next/link";
import Image from "next/image";

const images = Array.from(Array(10).keys());
const imageNames = images.map((number) => number + 1 + ".png");

export default function HomePage() {
  // console.log(imageNames);
  return (
    <main className="bg-lime-400">
      <div className="container flex flex-wrap gap-4">
        {[...imageNames, ...imageNames, ...imageNames].map(
          (imageName, index) => (
            <div key={index}>
              <Image
                width={100}
                height={100}
                src={`/${imageName}`}
                alt=""
              ></Image>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
