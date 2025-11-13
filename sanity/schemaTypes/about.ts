import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Nagłówek sekcji',
      type: 'string',
    }),
    defineField({
      name: 'subHeading',
      title: 'Podtytuł / opis',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Statystyki',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Statystyka',
          fields: [
            { name: 'value', title: 'Wartość', type: 'string' },
            { name: 'label', title: 'Opis', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3).error('Możesz dodać maksymalnie 3 statystyki'),
    }),
    defineField({
      name: 'solutionsHeading',
      title: 'Tytuł rozwiązań',
      type: 'string',
    }),
    defineField({
      name: 'solutionsSubHeading',
      title: 'Podtytuł / opis rozwiązań',
      type: 'string',
    }),
    defineField({
      name: 'solutionsList',
      title: 'Lista rozwiązań',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.max(5).error('Możesz dodać maksymalnie 5 punktów'),
    }),
  ],
})
