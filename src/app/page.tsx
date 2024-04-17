import Image from "next/image";
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Upload } from "./_compnent/upload";
import { getMyImages } from "~/server/queries";

// make updates in the db show up on the page. Otherwise, it won't update, because the page is cached
export const dynamic = "force-dynamic";

// const images = Array.from(Array(10).keys());
// const imageNames = images.map((number) => number + 1 + ".png");

async function Images() {
  const images = await getMyImages();

  return (
    <div className="container flex flex-wrap gap-4">
      {images.map((image, idx) => (
        <div key={idx} className="bg-orange-400">
          <div key={idx}>
            <Image width={100} height={100} src={image.url} alt=""></Image>
            <div>{image.id}</div>
            <div>{image.name}</div>
            <div>{image.createdAt.toDateString()}</div>
            <div>{image.updatedAt?.toDateString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// this only runs on the server
export default async function HomePage() {
  // images.map((image) => {
  //   console.log(image.url);
  // });
  // console.log(images);

  return (
    <main className="">
      <SignedOut>
        <div>please sign in</div>
      </SignedOut>
      <SignedIn>
        <div className="bg-amber-400">
          <Upload />
          <Images />
        </div>
      </SignedIn>
    </main>
  );
}
