import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

const images = Array.from(Array(10).keys());
const imageNames = images.map((number) => number + 1 + ".png");

// this only runs on the server
export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="bg-lime-400">
      <div className="container flex flex-wrap gap-4">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-orange-400">
            <div>{post.id}</div>
            <div>{post.name}</div>
            <div>{post.createdAt.toDateString()}</div>
            <div>{post.updatedAt?.toDateString()}</div>
          </div>
        ))}
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
