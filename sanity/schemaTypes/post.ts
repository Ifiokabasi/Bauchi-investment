// sanity/schemas/post.ts
// Drop into your Sanity Studio schema folder

import { defineField, defineType } from "sanity";



export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Investment",      value: "investment"      },
          { title: "Infrastructure",  value: "infrastructure"  },
          { title: "Agriculture",     value: "agriculture"     },
          { title: "Energy",          value: "energy"          },
          { title: "Capital Markets", value: "capital-markets" },
          { title: "Partnerships",    value: "partnerships"    },
          { title: "News",            value: "news"            },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        { name: "name",   type: "string", title: "Name"   },
        { name: "role",   type: "string", title: "Role"   },
        { name: "avatar", type: "image",  title: "Avatar" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Show this post in the hero spotlight",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", type: "string", title: "Caption" },
            { name: "alt",     type: "string", title: "Alt text" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "category" },
  },
});
