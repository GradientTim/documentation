import { createFileRoute, notFound } from '@tanstack/react-router'

import { source } from '~/lib/source'
import { getLLMText } from '~/lib/llm'
import { decodeMarkdownUrl } from '~/lib/shared'

export const Route = createFileRoute('/(ai)/{$}.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugs = decodeMarkdownUrl(params._splat?.split('/') ?? [])
        const page = source.getPage(slugs)
        if (!page) throw notFound()

        return new Response(await getLLMText(page), {
          headers: {
            'Content-Type': 'text/markdown',
          },
        })
      },
    },
  },
})
