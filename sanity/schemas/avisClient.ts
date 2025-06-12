// sanity/schemas/avisClient.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'avisClient',
  title: 'Avis Client',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom du client',
      type: 'string',
      validation: Rule => Rule.required().error('Le nom du client est requis.'),
    }),
    defineField({
      name: 'temoignage',
      title: 'Témoignage',
      type: 'text',
      validation: Rule => Rule.required().error('Le témoignage est requis.'),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'number',
      validation: Rule => Rule.min(1).max(5).error('La note doit être entre 1 et 5.'),
    }),
    defineField({
      name: 'photo',
      title: 'Photo du client (optionnel)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'temoignage',
      media: 'photo',
    },
  },
})
