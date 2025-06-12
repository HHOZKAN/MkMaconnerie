// sanity/schemas/chantier.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'chantier',
  title: 'Chantier',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required().error('Un titre est requis.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titre',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('Un slug est requis.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Images du chantier',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'date',
      title: 'Date du chantier',
      type: 'date',
    }),
    defineField({
      name: 'localisation',
      title: 'Localisation',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'titre',
      media: 'images.0',
    },
  },
})
