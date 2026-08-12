import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { GithubInfo } from '@fumadocs/base-ui/components/github-info'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'GadientTim Docs',
    },
    githubUrl: 'https://github.com/GradientTim',
    links: [
      {
        type: 'custom',
        children: <GithubInfo owner="GradientTim" repo="documentation" />,
      },
    ],
  }
}
