import { read } from 'fs';

export default {
    name: 'heroTextVariant',
    title: 'Hero Text Variant',
    type: 'document',
    fields: [
        {
            name: 'variantId',
            title: 'Variant ID',
            type: 'string',
            description: 'Unique identifier for this variant',
            validation: (Rule: any) =>
                Rule.required().warning('A variant ID is recommended'),
        },
        {
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Main heading text for the hero section',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'string',
            description: 'Secondary text below the main heading',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'distributionWeight',
            title: 'Distribution Weight',
            type: 'number',
            description: 'Percentage chance of showing this variant (0-100)',
            validation: (Rule: any) =>
                Rule.required()
                    .min(0)
                    .max(100)
                    .integer()
                    .error(
                        'Distribution weight must be a whole number between 0 and 100'
                    ),
        },
        {
            name: 'active',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this variant is currently active',
            initialValue: true,
        },
        {
            name: 'events',
            title: 'Events',
            type: 'object',
            description: 'Additional metadata for this variant',
            fields: [
                {
                    name: 'views',
                    initialValue: 0,
                    type: 'number',
                    title: 'Views',
                    readOnly: ({
                        currentUser,
                    }: {
                        currentUser: { roles: { name: string }[] };
                    }) => {
                        return currentUser?.roles.some(
                            (role) => role.name === 'developer'
                        )
                            ? false
                            : true;
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'variantId',
            subtitle: 'heroTitle',
            weight: 'distributionWeight',
            active: 'active',
        },
        prepare({
            title = 'Untitled',
            subtitle = '',
            weight = 0,
            active = false,
        }: any) {
            return {
                title: `${title} (${weight}%)`,
                subtitle: `${active ? 'Active' : 'Inactive'} - ${subtitle}`,
            };
        },
    },
};
