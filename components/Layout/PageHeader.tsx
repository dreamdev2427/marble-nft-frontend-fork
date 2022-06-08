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
        <Text
          variant="header"
          className={`page-title ${title=="NFT"?"nft-title":""}`}
          css={{ fontSize: '$12', lineHeight: '$5', textAlign: `${align}` }}
        >
          {title}
        </Text>
        {subtitle!=""&&
        <Text
          variant="body"
          className="page-subtitle"
          css={{ paddingTop: '1.5rem',paddingBottom: '2rem', fontSize: '$8', textAlign: 'center', maxWidth:'970px', margin:'0 auto', color:'$textColors$secondary' }}
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
