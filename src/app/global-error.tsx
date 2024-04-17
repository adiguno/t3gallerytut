"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError(props: { error: unknown }) {
  useEffect(() => {
    Sentry.captureException(props.error);
  }, [props.error]);

  return (
    <html>
      <body>
        {/* default to 500, should be more nuanced */}
        <Error statusCode={500} title="Error" />
      </body>
    </html>
  );
}
