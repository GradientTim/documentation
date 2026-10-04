'use client'

import { type ReactNode, use, useEffect, useId, useState } from 'react'
import { useTheme } from '@fumadocs/base-ui/provider/base'
import { Maximize, ZoomIn, ZoomOut } from 'lucide-react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return <MermaidContent chart={chart} />
}

const cache = new Map<string, Promise<unknown>>()

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key)
  if (cached) return cached as Promise<T>

  const promise = setPromise()
  cache.set(key, promise)
  return promise
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId()
  const { resolvedTheme } = useTheme()
  const { default: mermaid } = use(cachePromise('mermaid', () => import('mermaid')))

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    fontFamily: 'inherit',
    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
  })

  const { svg, bindFunctions } = use(
    cachePromise(`${chart}-${resolvedTheme}`, () => {
      return mermaid.render(id, chart.replaceAll('\\n', '\n'))
    }),
  )

  return (
    <div className="not-prose relative my-6 overflow-hidden rounded-xl border bg-fd-card">
      <TransformWrapper
        minScale={0.2}
        maxScale={8}
        fitOnInit
        limitToBounds={false}
        wheel={{ step: 0.1, activationKeys: ['Control', 'Meta'] }}
        doubleClick={{ disabled: true }}
      >
        <MermaidControls />
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '32rem', cursor: 'grab' }}
          contentStyle={{ padding: '1.5rem' }}
        >
          <div
            ref={(container) => {
              if (container) bindFunctions?.(container)
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </TransformComponent>
      </TransformWrapper>
      <p className="absolute bottom-2 left-3 text-xs text-fd-muted-foreground">
        Drag to move, Ctrl / ⌘ + scroll to zoom
      </p>
    </div>
  )
}

function MermaidControls() {
  const { zoomIn, zoomOut, fitToView } = useControls()

  return (
    <div className="absolute top-2 right-2 z-10 flex gap-1 rounded-lg border bg-fd-background p-1">
      <ControlButton label="Zoom in" onClick={() => zoomIn()}>
        <ZoomIn className="size-4" />
      </ControlButton>
      <ControlButton label="Zoom out" onClick={() => zoomOut()}>
        <ZoomOut className="size-4" />
      </ControlButton>
      <ControlButton label="Fit to view" onClick={() => fitToView()}>
        <Maximize className="size-4" />
      </ControlButton>
    </div>
  )
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {children}
    </button>
  )
}
