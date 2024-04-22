import Image from "next/image";
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Upload } from "./_compnent/upload";
import { deleteImage, getMyImages } from "~/server/queries";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

// make updates in the db show up on the page. Otherwise, it won't update, because the page is cached
export const dynamic = "force-dynamic";

// const images = Array.from(Array(10).keys());
// const imageNames = images.map((number) => number + 1 + ".png");

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 bg-yellow-400">
      {images.map((image, idx) => (
        <div key={idx} className="bg-orange-400">
          <div key={idx} className="flex flex-col items-center ">
            <Image
              width={100}
              height={100}
              src={image.url}
              alt={image.name}
              // fill
            ></Image>
            <div className="flex gap-2">
              <div>{image.id}</div>
              <div>{image.name}</div>
            </div>
            <div>{image.createdAt.toDateString()}</div>
            <div>{image.updatedAt?.toDateString()}</div>
            <form
              action={async () => {
                "use server";
                await deleteImage(Number(image.id));
                redirect("/");
              }}
            >
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
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
        <div className="flex flex-col items-center gap-4 bg-amber-400 p-4">
          {/* <Upload /> */}
          {/* <Suspense fallback="loading..."> */}
          <Suspense fallback={<Loading></Loading>}>
            <Images />
          </Suspense>
        </div>
      </SignedIn>
    </main>
  );
}
