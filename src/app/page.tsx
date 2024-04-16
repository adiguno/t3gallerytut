import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { asc } from "drizzle-orm";

// make updates in the db show up on the page. Otherwise, it won't update, because the page is cached
export const dynamic = "force-dynamic";

// const images = Array.from(Array(10).keys());
// const imageNames = images.map((number) => number + 1 + ".png");

// this only runs on the server
export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (images, { asc }) => [asc(images.id)],
  });
  // images.map((image) => {
  //   console.log(image.url);
  // });
  // console.log(images);

  return (
    <main className="bg-lime-400">
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
    </main>
  );
}
