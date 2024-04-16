"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "../utils/uploadthing";

export function Upload() {
  const router = useRouter();
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={() => router.refresh()}
    />
  );
}
