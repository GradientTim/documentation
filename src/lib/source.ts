import { createElement } from 'react'
import { icons } from 'lucide-react'

import { loader } from 'fumadocs-core/source'
import { defineDocs } from 'fumadocs-mdx/macro'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
})

// Eagerly loads every SVG under content/assets as raw markup at build time,
// so icon names prefixed with "asset:" can be resolved to inline SVGs.
const assetSvgs = import.meta.glob('/content/assets/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function findAssetSvg(name: string) {
  const entry = Object.entries(assetSvgs).find(([path]) => path.endsWith(`/${name}.svg`))
  return entry?.[1]
}

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  icon(name) {
    if (!name) return

    if (name.startsWith('asset:')) {
      const svg = findAssetSvg(name.slice('asset:'.length))
      if (!svg) return

      return createElement('span', {
        className: 'inline-flex size-4 shrink-0 [&>svg]:size-full',
        dangerouslySetInnerHTML: { __html: svg },
      })
    }

    if (name in icons) return createElement(icons[name as keyof typeof icons])
  },
})
