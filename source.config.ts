import { defineConfig } from 'fumadocs-mdx/config'

import lastModified from 'fumadocs-mdx/plugins/last-modified'
import { remarkSteps } from 'fumadocs-core/mdx-plugins/remark-steps'
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins/remark-mdx-mermaid'

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkSteps, remarkMdxMermaid],
  },
})
