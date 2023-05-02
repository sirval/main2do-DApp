// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** Global Blockchain related hooks
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'

const chains = [sepolia, polygonMumbai]

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  console.error('You need to provide project ID')
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

const { provider } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiClient = createClient({
  // theme: 'dark',
  // accentColor: 'default',
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)
if (!wagmiClient && !ethereumClient) {
  console.log('error found in wagmiClient or ethereumClient')

}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Running on Blockchain`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Is a todo list app running on Ethereum Virtual Machine built with Solidity, EthersJs and Nextjs .`}
        />
        <meta name='keywords' content='Blockchain, Ethereum, Solidity, Ethersjs, Nextjs' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <>
                <WagmiConfig client={wagmiClient}>
                  <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                </WagmiConfig>

                <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
              </>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
