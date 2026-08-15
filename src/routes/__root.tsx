import type { PropsWithChildren } from 'react'

import { RootProvider } from '@fumadocs/base-ui/provider/tanstack'
import { createRootRoute, HeadContent, Scripts, useRouter } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'GradientTim Docs',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundComponent,
})

function RootDocument({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundComponent() {
  const router = useRouter()

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-4">
      <p className="font-bold tracking-wide text-4xl">404 - Not Found</p>

      <button
        className="bg-teal-500 hover:bg-teal-600 px-2.5 py-1 rounded font-bold cursor-pointer transition"
        onClick={() => router.history.back()}
      >
        Go to previous page
      </button>
    </div>
  )
}
