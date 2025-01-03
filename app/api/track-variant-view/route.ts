import { type NextRequest } from 'next/server';

import { increaseVariantViews } from '@/sanity/lib/helpers/increaseVariantViews';

export async function POST(request: NextRequest) {
  const res = await request.json()
  const { variantId } = res;
  // const searchParams = request.nextUrl.searchParams
  // const variantId = searchParams.get('variantId')

  if (!variantId) {
    return new Response('Variant ID is required', {status: 400 });
  }

  try {
    await increaseVariantViews(variantId)
  return new Response('Event recorded', {status: 200 });
  } catch (error) {
    return new Response('Error recording event', {status: 500 });
  }
}