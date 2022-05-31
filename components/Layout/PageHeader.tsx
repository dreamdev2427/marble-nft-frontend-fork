import React from 'react'
import { Text } from '../Text'
import Head from 'next/head'
import { APP_NAME } from '../../util/constants'
import { styled } from '../theme'

export const PageHeader = ({ title, subtitle, align='center' }) => {
  return (
    <>
      <Head>
        <title>
          {APP_NAME} — {title}
        </title>
      </Head>
      <Banner className="banner-section">
      </Banner>
      <Text
        variant="header"
        className={`page-title ${title=="NFT"?"nft-title":""}`}
        css={{ marginTop: '40px', padding: '40px 0 25px', fontSize: '$12', textAlign: `${align}` }}
      >
        {title}
      </Text>
      {subtitle!=""&&
      <Text
        variant="body"
        className="page-subtitle"
        css={{ paddingBottom: '48px', fontSize: '$8', textAlign: 'center', maxWidth:'970px', margin:'0 auto', color:'$textColors$secondary' }}
      >
        {subtitle}
      </Text>
      }
    </>
  )
}
const Banner = styled('div', {
  height: '$25',

})
const StyledContainer = styled('div', {
  lineHeight: '$space$26',
  color: '$textColors$white',
  fontWeight: 'bold',
  fontSize: '$16'
})
