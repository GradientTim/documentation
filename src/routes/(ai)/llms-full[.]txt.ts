import { createFileRoute } from '@tanstack/react-router'
import { source } from '~/lib/source'
import { getLLMText } from '~/lib/llm'

export const Route = createFileRoute('/(ai)/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        const scan = source.getPages().map(getLLMText)
        const scanned = await Promise.all(scan)
        return new Response(scanned.join('\n\n'))
      },
    },
  },
})
