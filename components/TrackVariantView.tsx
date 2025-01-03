"use client";

import { useEffect } from "react";

export const TrackVariantView = ({children, variantId}: {children: React.ReactNode, variantId: string}) => {
  useEffect(() => {
    (async () => {
        await fetch('/api/track-variant-view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ variantId }),
        });
    })();
  }, [variantId]);

  return <>{children}</>;
};
