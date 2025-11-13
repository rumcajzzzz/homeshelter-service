import { defineType, defineField } from 'sanity'

export const offerings = defineType({
  name: 'offerings',
  title: 'Offerings',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Nagłówek sekcji',
      type: 'string',
    }),
    defineField({
      name: 'subHeading',
      title: 'Podtytuł sekcji',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Karty oferty',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Karta',
          fields: [
            { name: 'title', title: 'Tytuł karty', type: 'string' },
            { name: 'description', title: 'Opis karty', type: 'string' },
            {
              name: 'features',
              title: 'Lista cech',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
  ],
})
