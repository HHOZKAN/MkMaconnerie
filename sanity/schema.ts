// sanity/schema.ts
import {type SchemaTypeDefinition} from 'sanity'
import chantier from './schemas/chantier'
import conseil from './schemas/conseil'
import avisClient from './schemas/avisClient'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [chantier, conseil, avisClient],
}
