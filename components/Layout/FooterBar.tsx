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
          <Link href="/" passHref>
            <StyledImage
              src="/images/logo-footer.png"
              className="footer-logo"
            />
          </Link>
          <Text
            className="footer-desc"
            css={{ color: '$textColors$secondary', padding: '$space$10 0' }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loeam's standard dummy text ever since the and scrambled it to make a type specimen book.
          </Text>
          <StyledDivForFooter>
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
          </StyledDivForFooter>
        </ContainerForColumn>
        <ContainerForColumn className="bottom-quick-section">
         <h3 className="desktop-section">Marketplace</h3>
          <h3
            className={`mobile-section collapse-header ${openQuickNav ? 'open' :'close'}`}
            onClick={() => {
              setOpenQuickNav(!openQuickNav)
            }}
          >
            Marketplace
            {openQuickNav?<IconWrapper icon={<CollapseUp />} />:<IconWrapper icon={<CollapseDown />} />}
          </h3>
          <ContainerForMarketplace className={`footer-links ${openQuickNav ? 'open' :'close'}`}>
            <Link href="#" passHref >All NFTs</Link>
            <Link href="#" passHref >Photography</Link>
            <Link href="#" passHref >Art</Link>
            <Link href="#" passHref >Sports</Link>
            <Link href="#" passHref >Collectibles</Link>
            <Link href="#" passHref >Trading Cards</Link>
            <Link href="#" passHref >Domain Names</Link>
            <Link href="#" passHref >Utility</Link>
            <Link href="#" passHref >Music</Link>
            <Link href="#" passHref >Virtual Worlds</Link>
          </ContainerForMarketplace>
        </ContainerForColumn>
        <ContainerForColumn className="bottom-myaccount-section">
          <h3 className="desktop-section">My Account</h3>
          <h3
            className={`mobile-section collapse-header ${
              openCommunityNav ? 'open' : 'close'
            }`}
            onClick={() => {
              setOpenCommunityNav(!openCompanyNav)
            }}
          >
            My Account
            {openCommunityNav ? (
              <IconWrapper icon={<CollapseUp />} />
            ) : (
              <IconWrapper icon={<CollapseDown />} />
            )}
          </h3>
          <ContainerForFooterLinks className={`footer-links ${openCommunityNav ? 'open' :'close'}`}>
            <Link href="#" passHref>
              Profile
            </Link>
            <Link href="#" passHref>
              Favorites
            </Link>
            <Link href="#" passHref>
              Watchlist
            </Link>
            <Link href="#" passHref>
              My Collections
            </Link>
            <Link href="#" passHref>
              Settings
            </Link>
          </ContainerForFooterLinks>
        </ContainerForColumn>
        <ContainerForColumn className="bottom-community-section">
          <h3 className="desktop-section">Community</h3>
          <h3
            className={`mobile-section collapse-header ${
              openCommunityNav ? 'open' : 'close'
            }`}
            onClick={() => {
              setOpenCommunityNav(!openCompanyNav)
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
            <Link href={process.env.NEXT_PUBLIC_DISCORD_LINK} passHref>
              Discord
            </Link>
            <Link href={process.env.NEXT_PUBLIC_TELEGRAM_LINK} passHref>
              Telegram
            </Link>
            <Link href={process.env.NEXT_PUBLIC_TWITTER_LINK} passHref>
              Twitter
            </Link>
            <Link href={process.env.NEXT_PUBLIC_INTERFACE_GITHUB_LINK} passHref>
              Github
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
            <Link href={process.env.NEXT_PUBLIC_INTERFACE_GITHUB_LINK} passHref>
              Github
            </Link>
            <Link href={process.env.NEXT_PUBLIC_MEDIUM_LINK} passHref>
              Medium
            </Link>
            <Link href="https://discord.gg/zKbNUByUHR" passHref>
              Support
            </Link>
          </ContainerForFooterLinks>
        </ContainerForColumn>
      </ContainerBottom>
      <Container className="footer-section">
        <Container className="copyright">
          <Text>Copyright © {new Date().getFullYear()} Marble Dao</Text>
        </Container>
        <Container className="terms-policy">
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
        </Container>
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
  minWidth: '128px',
  flexDirection: 'column',
})
const ContainerForMarketplace = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridColumnGap: '$16',
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
})
