import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "../loading";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-red-400 p-4 text-xl font-semibold">
      <div className="">Gallery</div>
      <div className="">
        <Suspense fallback={<Loading></Loading>}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Suspense>
      </div>
    </nav>
  );
}
