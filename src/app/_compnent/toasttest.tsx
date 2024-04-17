"use client";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export function Toastmyass() {
  return <Button onClick={() => toast("uploading...")}>test</Button>;
}
