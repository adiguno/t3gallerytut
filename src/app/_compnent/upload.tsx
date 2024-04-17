"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "../utils/uploadthing";
import { toast } from "sonner";

export function Upload() {
  const router = useRouter();
  return (
    <UploadButton
      endpoint="imageUploader"
      onUploadBegin={() =>
        toast("uploading...", {
          duration: 100000,
          id: "upload-begin",
        })
      }
      onClientUploadComplete={() => {
        toast.dismiss("upload-begin");
        toast("Upload Complete!");
        router.refresh();
      }}
    />
  );
}
