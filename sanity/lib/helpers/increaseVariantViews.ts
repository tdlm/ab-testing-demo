import { client } from '@/sanity/lib/client';

export async function increaseVariantViews(variantId: string): Promise<void> {
    try {
        await client
            .patch(variantId)
            .setIfMissing({ 'events.views': 0 })
            .inc({ 'events.views': 1 })
            .commit();
    } catch (error) {
        console.error('Error updating variant views:', error);
        throw error;
    }
}
