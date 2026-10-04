import type { MDXComponents } from 'mdx/types'

import defaultMdxComponents from '@fumadocs/base-ui/mdx'
import { Tab, Tabs } from '@fumadocs/base-ui/components/tabs'
import { Mermaid } from '~/components/mermaid'

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Mermaid,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
