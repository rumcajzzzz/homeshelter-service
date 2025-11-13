// sanity/schemas/contact.ts
import { defineType, defineField } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'subHeading',
      title: 'Podtekst nagłówka',
      type: 'string',
    }),
    defineField({
      name: 'Phone',
      title: 'Numer telefonu',
      type: 'string',
    }),
	defineField({
	  name: 'Email',
	  title: 'Email',
	  type: 'string',
	}),
	defineField({
	  name: 'Address',
	  title: 'Adres Firmy',
	  type: 'string',
	}),
  ],
})
