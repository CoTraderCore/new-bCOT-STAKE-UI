import React, { Suspense, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { Button, Text, MetamaskIcon, useModal } from 'cofetch-uikit'
import HowItWorksModal from 'components/PopupModals/HowItWorksModal'
import useI18n from 'hooks/useI18n'
import AddbCOTModal from 'components/PopupModals/AddbCOTModal'
import AddCOSModal from 'components/PopupModals/AddCOSModal'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager' 
import Stats from './Stats'
import Deposit from './Deposit'
import Stake from './Stake'
import Withdraw from './Withdraw'
import { RedirectPathToDepositOnly } from './Deposit/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext' 
import Menu from '../components/Menu'

// init google analitics
ReactGA.initialize('G-ZJK3NHRRPV', { debug: true })

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/arch-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.svg');
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6

  const credentials: Credentials = {
    token: apiKey,
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  // init google analitics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  })

  useEffect(() => {
    const storedLangCode = localStorage.getItem('pancakeSwapLanguage')
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch((error) => {
        setTranslations(['error'])
        console.error(error)
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

 
  const TranslateString = useI18n()
  const [getHowItWorksModal] = useModal(<HowItWorksModal translateString={TranslateString}/>)
  const [getAddbCOTModal] = useModal(<AddbCOTModal translateString={TranslateString}/>)
  const [getAddCOSModal] = useModal(<AddCOSModal translateString={TranslateString}/>)

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/" component={Deposit} />
                      <Route exact strict path="/deposit" component={Deposit} />
                      <Route exact strict path="/withdraw" component={Withdraw} />
                      <Route exact strict path="/stats" component={Stats} />
                      <Route exact strict path="/stake" component={Stake} />
                      <Route component={RedirectPathToDepositOnly} />
                    </Switch>
                  </Web3ReactManager>
                  <Button onClick={getHowItWorksModal}>
                    How this works?
                  </Button>
                  <Text style={{ marginTop: '5px' }}>
                    Add token addresses to wallet <MetamaskIcon style={{ verticalAlign: 'bottom' }} /> <br />{' '}
                    <Button onClick={getAddbCOTModal} style={{ marginRight: '10px', marginLeft: '28px' }}>bCOT</Button>
                    <Button onClick={getAddCOSModal}>COS</Button>
                  </Text>
                  <Marginer />
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
