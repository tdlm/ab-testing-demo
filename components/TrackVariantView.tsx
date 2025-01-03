'use client';

import { useEffect } from 'react';

type TrackVariantViewProps = {
    children: React.ReactNode;
    variantId?: string;
};

export const TrackVariantView = ({
    children,
    variantId = '',
}: TrackVariantViewProps) => {
    useEffect(() => {
        if (!variantId) {
            return;
        }

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
