import type { BaseLayoutProps } from '@fumadocs/base-ui/layouts/shared'
import { GithubInfo } from '@fumadocs/base-ui/components/github-info'

import { SiBluesky } from '@icons-pack/react-simple-icons'

const projects: string[] = ['gradeway']

export function baseOptions(project: string | undefined): BaseLayoutProps {
  return {
    nav: {
      title: 'GadientTim Docs',
    },
    githubUrl: 'https://github.com/GradientTim',
    links: [
      {
        type: 'icon',
        icon: <SiBluesky />,
        text: 'bluesky',
        url: 'https://bsky.app/profile/gradienttim.dev',
        external: true,
      },
      {
        type: 'custom',
        children: (
          <GithubInfo
            owner="GradientTim"
            repo={project && projects.includes(project) ? project : 'documentation'}
          />
        ),
      },
    ],
  }
}
