import { useEffect, useState } from 'react'
import { Text } from '../Text'
import { styled } from '../theme'
import Link from 'next/link'
import { Button } from '../Button'
import { UpRightArrow, CollapseUp, CollapseDown } from '../../icons'
import { IconWrapper } from '../IconWrapper'
import { APP_NAME } from '../../util/constants'
import { Github } from '../../icons/Github'
import { Medium } from '../../icons/Medium'
import { Discord } from '../../icons/Discord'
import { Telegram } from '../../icons/Telegram'
import { Twitter } from '../../icons/Twitter'

export const FooterBar = () => {
  const [openQuickNav, setOpenQuickNav] = useState(false)
  const [openCommunityNav, setOpenCommunityNav] = useState(true)
  const [openCompanyNav, setOpenCompanyNav] = useState(true)

  const buttonIconCss = {
    border: '2px solid $colors$black',
    borderRadius: '50%',
    '& svg': {
      color: '$iconColors$white',
    },
  }
  return (
    <StyledFooter>
      <ContainerBottom className="bottom-section">
        <ContainerForColumn className="bottom-desc-section">
          <Link href="https://nft.marbledao.finance" passHref>
            <StyledImage
              src="/images/logotext-black.svg"
              className="footer-logo"
            />
          </Link>
          <Text
            className="footer-desc"
            css={{ color: '$textColors$secondary', fontSize: '$7.5', padding: '$space$10 0' }}
          >
            Marble is the first community-driven DAO on Juno Network. Marble is
            an all-in-one platform with DeFi products, NFT Marketplace and
            exclusive NFTs of real artworks.
          </Text>
          <StyledDivForFooter className="mobile-section">
            <Button
              as="a"
              href={process.env.NEXT_PUBLIC_DISCORD_LINK}
              target="__blank"
              icon={<IconWrapper icon={<Discord />} />}
              variant="ghost"
              size="medium"
              css={buttonIconCss}
            />
            <Button
              as="a"
              href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
              target="__blank"
              icon={<IconWrapper icon={<Telegram />} />}
              variant="ghost"
              size="medium"
              css={buttonIconCss}
            />
            <Button
              as="a"
              href={process.env.NEXT_PUBLIC_TWITTER_LINK}
              target="__blank"
              icon={<IconWrapper icon={<Twitter />} />}
              variant="ghost"
              size="medium"
              css={buttonIconCss}
            />
            <Button
              as="a"
              href={process.env.NEXT_PUBLIC_INTERFACE_GITHUB_LINK}
              target="__blank"
              icon={<IconWrapper icon={<Github />} />}
              variant="ghost"
              size="medium"
              css={buttonIconCss}
            />
            <Button
              as="a"
              href={process.env.NEXT_PUBLIC_MEDIUM_LINK}
              target="__blank"
              icon={<IconWrapper icon={<Medium />} />}
              variant="ghost"
              size="medium"
              css={buttonIconCss}
            />
          </StyledDivForFooter>
        </ContainerForColumn>
        {/*  <ContainerForColumn className="bottom-quick-section">
         <h3 className="desktop-section">Quick Links</h3>
          <h3
            className={`mobile-section collapse-header ${openQuickNav ? 'open' :'close'}`}
            onClick={() => {
              setOpenQuickNav(!openQuickNav)
            }}
          >
            Quick Links
            {openQuickNav?<IconWrapper icon={<CollapseUp />} />:<IconWrapper icon={<CollapseDown />} />}
          </h3>
          <ContainerForQuickLinks className={`footer-links ${openQuickNav ? 'open' :'close'}`}>
            <Link href="#" passHref >Swap</Link>
            <Link href="#" passHref >Marble NFTs</Link>
            <Link href="/transfer" passHref >Transfer</Link>
            <Link href="/airdrop" passHref >Marble GovDrop</Link>
            <Link href="/pools" passHref >Liquidity</Link>
            <Link href="https://daodao.zone/dao/juno1ay840g97ngja9k0f9lnywqxwk49245snw69kpwz0ry9qv99q367q3m4x8v" passHref >Marble DAO</Link>
            <Link href="/presale" passHref >Presale</Link>
          </ContainerForQuickLinks>
        </ContainerForColumn>*/}
        <ContainerForColumn className="bottom-community-section">
          <h3 className="desktop-section">Community</h3>
          <h3
            className={`mobile-section collapse-header ${
              openCommunityNav ? 'open' : 'close'
            }`}
            onClick={() => {
              setOpenCommunityNav(!openCommunityNav)
            }}
          >
            Community
            {openCommunityNav ? (
              <IconWrapper icon={<CollapseUp />} />
            ) : (
              <IconWrapper icon={<CollapseDown />} />
            )}
          </h3>
          <ContainerForFooterLinks className={`footer-links ${openCommunityNav ? 'open' :'close'}`}>
            <Link href={process.env.NEXT_PUBLIC_MEDIUM_LINK} passHref>
              Medium
            </Link>
            <Link href={process.env.NEXT_PUBLIC_TWITTER_LINK} passHref>
              Twitter
            </Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_LINK} passHref>
              Discord
            </Link>
            <Link href={process.env.NEXT_PUBLIC_TELEGRAM_LINK} passHref>
              Telegram
            </Link>
          </ContainerForFooterLinks>
        </ContainerForColumn>
        <ContainerForColumn className="bottom-company-section">
          <h3 className="desktop-section">Company</h3>
          <h3
            className={`mobile-section collapse-header ${
              openCompanyNav ? 'open' : 'close'
            }`}
            onClick={() => {
              setOpenCompanyNav(!openCompanyNav)
            }}
          >
            Company
            {openCompanyNav ? (
              <IconWrapper icon={<CollapseUp />} />
            ) : (
              <IconWrapper icon={<CollapseDown />} />
            )}
          </h3>
          <ContainerForFooterLinks className={`footer-links ${openCompanyNav ? 'open' :'close'}`}>
            <Link href="https://marbledao.finance" passHref>
              Home
            </Link>
            <Link href="https://daodao.zone/dao/juno1zz3gc2p9ntzgjt8dh4dfqnlptdynxlgd4j7u2lutwdg5xwlm4pcqyxnecp" passHref>
              DAO
            </Link>
            <Link href={process.env.NEXT_PUBLIC_INTERFACE_GITHUB_LINK} passHref>
              Github
            </Link>
            <Link href="https://discord.gg/zKbNUByUHR" passHref>
              Support
            </Link>
          </ContainerForFooterLinks>
        </ContainerForColumn>
      </ContainerBottom>
      <Container className="jc-space-between footer-section">
        <StyledDivForFooter className="desktop-section">
          <Button
            as="a"
            href={process.env.NEXT_PUBLIC_DISCORD_LINK}
            target="__blank"
            icon={<IconWrapper icon={<Discord />} />}
            variant="ghost"
            size="medium"
            css={buttonIconCss}
          />
          <Button
            as="a"
            href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
            target="__blank"
            icon={<IconWrapper icon={<Telegram />} />}
            variant="ghost"
            size="medium"
            css={buttonIconCss}
          />
          <Button
            as="a"
            href={process.env.NEXT_PUBLIC_TWITTER_LINK}
            target="__blank"
            icon={<IconWrapper icon={<Twitter />} />}
            variant="ghost"
            size="medium"
            css={buttonIconCss}
          />
          <Button
            as="a"
            href={process.env.NEXT_PUBLIC_INTERFACE_GITHUB_LINK}
            target="__blank"
            icon={<IconWrapper icon={<Github />} />}
            variant="ghost"
            size="medium"
            css={buttonIconCss}
          />

          <Button
            as="a"
            href={process.env.NEXT_PUBLIC_MEDIUM_LINK}
            target="__blank"
            icon={<IconWrapper icon={<Medium />} />}
            variant="ghost"
            size="medium"
            css={buttonIconCss}
          />
        </StyledDivForFooter>
        <Container className="align-items-center">
          <Text
          css={{ fontSize: '$7.5', padding: '$space$10 0' }}
          >
        Copyright © {new Date().getFullYear()} Marble Dao</Text>
        </Container>
        {/*  <Container className="align-items-center">
          <Button className="underline"
            as="a"
            href="#"
            variant="ghost"
            css={{marginRight: '$6',}}
          >
            Terms & Condition
          </Button>
          <Button className="underline"
            css={{
              listStyle: 'disc',
              display: 'list-item',
              paddingLeft: '0',
              paddingRight: '0'
            }}
            as="a"
            href="#"
            variant="ghost"
          >
            Privacy Policy
          </Button>
        </Container>*/}
      </Container>
    </StyledFooter>
  )
}
const Container = styled('div', {
  display: 'flex',
})
const StyledImage = styled('img', {})
const ContainerBottom = styled('div', {
  display: 'flex',
  borderBottom: '1px solid $borderColors$default',
})
const ContainerForColumn = styled('div', {
  display: 'flex',
  minWidth: '180px',
  flexDirection: 'column',
})
const ContainerForQuickLinks = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  ' a': {
    padding: '$4 0',
    color: '$textColors$secondary',
  },
})
const ContainerForFooterLinks = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  ' a': {
    padding: '$4 0',
    color: '$textColors$secondary',
  },
})
const StyledFooter = styled('footer', {
  alignItems: 'center',
})

const StyledDivForGrid = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  flexGrow: '1',
  rowGap: '$12',
  ' a': {
    padding: '0px',
    '&:hover': {
      background: 'transparent',
    },
  },
})

const StyledDivForFooter = styled('div', {
  display: 'flex',
  columnGap: '$space$2',
  padding: '$13 0',
})
