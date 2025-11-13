import { type SchemaTypeDefinition } from 'sanity'
import { footer } from './footer'
import { contact } from './contact'
import { about } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    footer,
    contact,
    about,
  ],
}
