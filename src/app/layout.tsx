import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import { type Section } from '@/components/SectionProvider'

export const metadata: Metadata = {
  title: {
    template: '%s - Tollbit Documentation',
    default: 'Tollbit Documentation',
  },
  description:
    'Learn how to onboard and implement Tollbit for your application.',
  openGraph: {
    title:
      'Tollbit Documentation and API reference - Onboarding and Implementation',
    description:
      'Learn how to onboard and implement Tollbit for your application.',
    url: 'https://docs.tollbit.com',
    siteName: 'Tollbit Documentation',
    images: [
      {
        url: 'https://docs.tollbit.com/ogimage.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tollbit Documenation',
    description:
      'Learn how to onboard and implement Tollbit for your application.',
    images: ['https://docs.tollbit.com/ogimage.png'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
