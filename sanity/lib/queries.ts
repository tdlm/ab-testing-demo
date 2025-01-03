import {defineQuery} from 'next-sanity'

// Get all variantIds of active heroTextVariants with their distributionWeight.
export const HERO_TEXT_VARIANT_QUERY = defineQuery(`*[_type == "heroTextVariant" && active == true]{variantId, distributionWeight}`)

// Get the heroTextVariant by variantId.
export const HERO_TEXT_VARIANT_BY_ID_QUERY = defineQuery(`*[_type == "heroTextVariant" && variantId == $variantId][0]`)

