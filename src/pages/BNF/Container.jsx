import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import BNFStatusCard from './BNFStatusCard'
import BNFTradeHistory from './BNFTradeHistory'

const BNFContainer = (props) => {
  return (
    <>
      <DashboardPage
        title={'BNF'}
        // description="Get daily analysis of stocks based on the RH strategy"
        loginRequired={true}
        // LoginTitle={'For getting access to ATH strategies, please login '}
        {...props}>
        <BNFStatusCard />
        <BNFTradeHistory />
      </DashboardPage>
    </>
  )
}

export default BNFContainer
