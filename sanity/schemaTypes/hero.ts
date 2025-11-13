import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'heading1',
      title: 'Nagłówek1',
      type: 'string',
    }),
	defineField({
		name: 'heading2',
		title: 'Nagłówek2',
		type: 'string',
	  }),
    defineField({
      name: 'subHeading1',
      title: 'Podtytuł1 / opis1',
      type: 'string',
    }),
	defineField({
		name: 'subHeading2',
		title: 'Podtytuł2 / opis2',
		type: 'string',
	  }),
    defineField({
      name: 'buttonContact',
      title: 'Przycisk Kontakt',
      type: 'string',
    }),
    defineField({
      name: 'buttonOffer',
      title: 'Przycisk Oferta',
      type: 'string',
    }),
    defineField({
      name: 'infoTile',
      title: 'Kafelek informacyjny',
      type: 'string',
      description: 'Krótka informacja np. "Zgodne z wytycznymi MSWiA i ustawą o ochronie ludności"',
    }),
  ],
})
