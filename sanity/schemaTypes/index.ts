import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './hero'
import { about } from './about'
import { offerings } from './offerings'
import { contact } from './contact'
import { footer } from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    about,
    offerings,
    contact,
    footer,
  ],
}
