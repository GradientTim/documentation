import { Suspense } from 'react'

import { createServerFn } from '@tanstack/react-start'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { useFumadocsLoader } from 'fumadocs-core/source/client'

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
  PageLastUpdate,
} from 'fumadocs-ui/layouts/notebook/page'

import { baseOptions } from '~/lib/layout.shared.tsx'
import { docs, source } from '~/lib/source.ts'
import { useMDXComponents } from '~/components/mdx.tsx'

export const Route = createFileRoute('/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? []
    const data = await serverLoader({ data: slugs })
    await docs.getPage(data.path)?.preload()
    return data
  },
})

const serverLoader = createServerFn({
  method: 'GET',
})
  .validator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs)
    if (!page) throw notFound()

    return {
      path: page.path,
      pageTree: await source.serializePageTree(source.getPageTree()),
    }
  })

function Content({ path }: { path: string }) {
  const page = docs.getPage(path)
  if (!page) throw new Error(`unknown page: ${path}`)

  const { toc, body: MDX, lastModified } = page

  const plainMarkdownUrl = page.info.path.replace(/\.mdx$/, '.md')

  return (
    <DocsPage toc={toc} breadcrumb={{ enabled: false }}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>

      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={plainMarkdownUrl} />
        <ViewOptionsPopover
          markdownUrl={plainMarkdownUrl}
          githubUrl={`https://github.com/GradientTim/documentation/blob/main/content/docs/${page.info.path}`}
        />
      </div>

      <DocsBody>
        <MDX components={useMDXComponents()} />
      </DocsBody>

      {lastModified && <PageLastUpdate date={lastModified} />}
    </DocsPage>
  )
}

function Page() {
  const data = useFumadocsLoader(Route.useLoaderData())

  return (
    <DocsLayout {...baseOptions()} tree={data.pageTree}>
      <Suspense>
        <Content path={data.path} />
      </Suspense>
    </DocsLayout>
  )
}
