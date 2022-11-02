import React from 'react'
import { RobotoMono } from '@next/font/google'
import { fetchGlobals } from '../graphql'
import { Providers } from '../components/providers'
import { Header } from '../components/Header'
// import { themeCookieName } from '../components/providers/Theme/shared'
import { Footer } from '../components/Footer'

const robotoMono =  RobotoMono({ weight: 'variable', display: 'swap', preload: true  })

import '../css/app.scss'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { mainMenu, footer } = await fetchGlobals()

  return (
    <html lang="en" data-theme="light" className={ robotoMono.className}>
      <head>
        <title>Payload CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </head>
      <body>
        <Providers theme={'light'}>
          <Header {...mainMenu} />
          {children}
          <Footer {...footer} />
        </Providers>
      </body>
    </html>
  )
}
