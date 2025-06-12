// sanity/schemas/conseil.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'conseil',
  title: 'Conseil',
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
      name: 'contenu',
      title: 'Contenu riche',
      type: 'array', // Using array for rich text (block content)
      of: [
        {
          type: 'block',
        },
        {
          type: 'image', // Allow images within the rich text
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'imagePrincipale',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'titre',
      media: 'imagePrincipale',
    },
  },
})
