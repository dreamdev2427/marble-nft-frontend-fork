import React from 'react'
import { Text } from '../Text'
import Head from 'next/head'
import { APP_NAME } from '../../util/constants'

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
        className="page-title"
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
