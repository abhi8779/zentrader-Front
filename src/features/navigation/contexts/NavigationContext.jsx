import { useFeature } from '@/features/subscription/featureAndUsage/hooks/useFeatureHook'
import BackTestContainer from '@/pages/BackTest'

import { Box, CircularProgress } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React from 'react'
import loadable from 'react-loadable'
import { useSelector } from 'react-redux'

const AlertsContainer = loadable({
  loader: () => import(/* webpackChunkName: "alerts-page" */ '@/pages/Alerts'),
  loading: () => (
    <Box margin="auto">
      <CircularProgress />
    </Box>
  )
})

const ChartsPage = loadable({
  loader: () => import(/* webpackChunkName: "charts-page" */ '@/pages/Charts'),
  loading: () => (
    <Box margin="auto">
      <CircularProgress />
    </Box>
  )
})

const AthContainer = loadable({
  loader: () => import(/* webpackChunkName: "ath-page" */ '@/pages/Ath'),
  loading: () => (
    <Box margin="auto">
      <CircularProgress />
    </Box>
  )
})

const BNFContainer = loadable({
  loader: () =>
    import(/* webpackChunkName: "BNF-page" */ '@/pages/BNF/Container'),
  loading: () => (
    <Box margin="auto">
      <CircularProgress />
    </Box>
  )
})

const NavigationContext = React.createContext({})

const NavigationContextProvider = ({ children }) => {
  const { getFeature } = useFeature()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const bnf = getFeature('bnf')

  const menu = [
    {
      menuLabel: 'Tools',
      items: [
        {
          label: 'Price Alerts',
          component: (props) => <AlertsContainer {...props} />,
          icon: (color, size, style) => (
            <NotificationsIcon color={color} size={size} style={style} />
          ),
          path: '/alerts/'
        },
        {
          label: 'Charts',
          component: (props) => <ChartsPage {...props} />,
          icon: (color, size, style) => (
            <BarChartIcon color={color} size={size} style={style} />
          ),

          path: '/charts/'
        }
      ]
    },
    {
      menuLabel: 'Strategy',
      items: [
        {
          label: 'RH',
          component: (props) => <AthContainer version="MCC" {...props} />,
          icon: 'RH',
          path: '/ath/'
        },
        bnf && {
          label: 'BNF',
          component: (props) => <BNFContainer {...props} />,
          icon: 'BNF',
          path: '/bnf/'
        },
        // athPro && {
        //   label: 'ATH-D',
        //   component: (props) => <AthContainer version="DCC" {...props} />,
        //   icon: (isActive) => <TextIcon text={'AD'} isActive={isActive} />,
        //   path: '/ath/DCC/'
        // },
        // athPro && {
        //   label: 'ATH-W',
        //   component: (props) => <AthContainer version="WCC" {...props} />,
        //   icon: (isActive) => <TextIcon text={'AW'} isActive={isActive} />,
        //   path: '/ath/WCC/'
        // },

        isLoggedIn && {
          label: 'Bank Nifty',
          component: (props) => <BackTestContainer {...props} />,
          icon: 'BN',
          path: '/backtest/'
        }
      ]
    }
    // {
    //   menuLabel: 'Resources',
    //   items: [
    //     isLoggedIn && {
    //       label: 'Automated Sheet',
    //       component: (props) => <FreeWorkshop {...props} />,
    //       icon: 'AS',
    //       path: '/workshop/'
    //     }
    //   ]
    // }
  ]

  const bottomMenu = [
    // {
    //   label: 'Terms & Conditions',
    //   component: (props) => <TermCondition {...props} />,
    //   icon: 'T',
    //   path: '/term/'
    // },
    // {
    //   label: 'Privacy Policy',
    //   component: (props) => <PrivacyPolicy {...props} />,
    //   icon: 'P',
    //   path: '/privacy/'
    // },
    // {
    //   label: 'Contact us',
    //   component: (props) => <ContactUs {...props} />,
    //   icon: 'C',
    //   path: '/contact/'
    // }
  ]

  const filteredMenu = menu
    .map((menu) => {
      const validItems = menu.items.filter((value) => Boolean(value))
      return {
        menuLabel: menu.menuLabel,
        items: validItems.length === 0 ? null : validItems
      }
    })
    .filter((menu) => menu.items)
  return (
    <NavigationContext.Provider value={{ filteredMenu, bottomMenu }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationContext
export { NavigationContextProvider }
