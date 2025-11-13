import { defineType, defineField } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nazwa firmy',
      type: 'string',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Tekst copyright',
      type: 'string',
    }),
	defineField({
	  name: 'slogan',
	  title: 'Slogan Firmy',
	  type: 'string',
	}),
  ],
})
