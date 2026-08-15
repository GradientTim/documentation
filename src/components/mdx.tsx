import type { MDXComponents } from 'mdx/types'

import defaultMdxComponents from '@fumadocs/base-ui/mdx'
import { Tab, Tabs } from '@fumadocs/base-ui/components/tabs'

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
