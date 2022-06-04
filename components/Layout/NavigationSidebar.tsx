import React from 'react'
import { useEffect, useState} from 'react'
import Link from 'next/link'
import { Button } from '../Button'
{/*import { Text } from '../Text'
import { Logo } from '../../icons/Logo'
import { LogoText } from '../../icons/LogoText'*/}
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useRecoilState } from 'recoil'
import { walletState, WalletStatusType } from '../../state/atoms/walletAtoms'
import { useRouter } from 'next/router'
import {
  Search,
  User,
  UpRightArrow,
  ArrowDown,
  Exchange,
  Presale,
  Open,
  Dao,
  NFTs,
  Dash,
  NewDash,
  Airdrop,
  Astronaut,
  Ellipse,
  Nav, } from '../../icons'
import { IconWrapper } from '../IconWrapper'
import { ConnectedWalletButton } from '../ConnectedWalletButton'

import { styled } from '../theme'
import { __TEST_MODE__ } from '../../util/constants'

export function NavigationSidebar({ openNav ,setOpenNav }) {
  const { mutate: connectWallet } = useConnectWallet()
  const [{ key }, setWalletState] = useRecoilState(walletState)

  function resetWalletConnection() {
    setWalletState({
      status: WalletStatusType.idle,
      address: '',
      key: null,
      client: null,
    })
  }

  const { pathname } = useRouter()
  const getActiveStylesIfActive = (path) =>
    pathname === path || (pathname.indexOf("/collection/") != -1 && path.indexOf("/collection/") != -1)? { borderBottom: '3px solid $white', background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 100%)" } : {borderBottom: '3px solid transparent', background: 'transparent' }

  const isActive = (path) => (pathname === path ? 'active' : '')
  const StyledImageForLogoText = styled('img', {
    borderRadius: '0%',
  })
  console.log("Key", key)
  return (
    <>
      <StyledWrapper className={`wrap-header ${openNav ? 'open' :''}`}>
        <StyledMenuContainer className="wrap-menu container">
          <IconWrapper
            className="mobile-nav"
              type="button"
              icon={<Nav />}
              onClick={() => {
                setOpenNav(!openNav)
              }}
          />
          <Link href="/" passHref>
            <StyledDivForLogo as="a">
              <StyledImageForLogoText className="logo-img" src="/images/logotext.svg" />
            </StyledDivForLogo>
          </Link>

          <StyledListForLinks className="top-menu-links">
          <div className="dropdown">
            <Link href="https://app.marbledao.finance/dashboard" passHref>
              <button className="dropbtn">
                  Dashboard
                    <NewDash />
              </button>
            </Link>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              DeFi
              <ArrowDown />
            </button>
            <div className="dropdown-content">
              <Link href="https://app.marbledao.finance/" passHref>
                <a className="dropdown-item">
                  <Exchange />
                  <span className={isActive('/')}>Swap</span>
                </a>
              </Link>
              <Link href="https://app.marbledao.finance/transfer" passHref>
                <a className="dropdown-item">
                  <UpRightArrow />
                  <span className={isActive('https://app.marbledao.finance/transfer')}>Transfer</span>
                </a>
              </Link>
              <Link href="https://app.marbledao.finance/pools" passHref>
                <a className="dropdown-item">
                  <Open />
                  <span className={isActive('https://app.marbledao.finance/pools')}>Liquidity</span>
                </a>
              </Link>
              <Link href="https://app.marbledao.finance/presale-claim" passHref>
                <a className="dropdown-item">
                  <Airdrop />
                  <span className={isActive('https://app.marbledao.finance/presale-claim')}>
                    Presale Claim
                  </span>
                </a>
              </Link>
              <Link href="https://app.marbledao.finance/early-lp" passHref>
                <a className="dropdown-item">
                  <Ellipse />
                  <span className={isActive('https://app.marbledao.finance/early-lp')}>
                    Early LPers
                  </span>
                </a>
              </Link>
            </div>
          </div>
          <div className="dropdown">
              <button className="dropbtn">
                NFT Marketplace<span className="span-mark">Beta</span>
                <ArrowDown />
              </button>
              <div className="dropdown-content">
                <Link href="/" passHref>
                  <a className="dropdown-item">
                    <Search />
                    <span className={isActive('/')}>
                    Explore
                    </span>
                  </a>
                </Link>
                { Boolean(key?.name) &&
                <Link href={{
                  pathname: '/profile',
                  query: { key: key, user: key.bech32Address },
                }} passHref>
                  <a className="dropdown-item">
                    <User />
                    <span className={isActive('/profile')}>
                    Profile
                    </span>
                  </a>
                </Link>
                }
                <Link href="/collection/marblenauts" passHref>
                  <a className="dropdown-item">
                    <Astronaut />
                    <span className={isActive('/collection/[name]')}>
                      The Marblenauts
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          <div className="dropdown">
            <button className="dropbtn">
              Airdrop
              <ArrowDown />
            </button>
            <div className="dropdown-content">
              <Link
                href="https://app.marbledao.finance/airdrop"
                passHref
              >
                <a className="dropdown-item">
                  <span className={isActive('/airdrop')}>Marble GovDrop</span>
                </a>
              </Link>
              <Link
                href="https://app.marbledao.finance/block-airdrop"
                passHref
              >
                <a className="dropdown-item">
                  <span className={isActive('/block-airdrop')}>Block Drop</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              Governance
              <ArrowDown />
            </button>
            <div className="dropdown-content">
              <Link
                href="https://daodao.zone/dao/juno1zz3gc2p9ntzgjt8dh4dfqnlptdynxlgd4j7u2lutwdg5xwlm4pcqyxnecp"
                passHref
              >
                <a className="dropdown-item" target="__blank">
                  <Dao />
                  <span>New DAO</span>
                </a>
              </Link>
              <Link
                href="https://daodao.zone/dao/juno1ay840g97ngja9k0f9lnywqxwk49245snw69kpwz0ry9qv99q367q3m4x8v"
                passHref
              >
                <a className="dropdown-item" target="__blank">
                  <Dao />
                  <span>Old DAO</span>
                </a>
              </Link>
            </div>
          </div>
          </StyledListForLinks>
          
          <ConnectedWalletButton
            connected={Boolean(key?.name)}
            walletName={key?.name}
            onConnect={() => connectWallet(null)}
            onDisconnect={resetWalletConnection}
          />

        </StyledMenuContainer>
      </StyledWrapper>
      <MobileMenu className={`mobile-menu ${openNav ? 'open' :''}`}>

        <StyledListForLinks className={`top-menu-links ${openNav ? 'open' :''}`}>
        <Link href="https://app.marbledao.finance/dashboard" passHref>
          <Button className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<NewDash />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/dashboard')}
          >
            Dashboard
          </Button>
        </Link>
        <Link href="https://app.marbledao.finance" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Exchange />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance')}
          >
            Swap
          </Button>
        </Link>
        <Link href="https://app.marbledao.finance/transfer" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<UpRightArrow />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/transfer')}
          >
            Transfer
          </Button>
        </Link>
        <Link href="https://app.marbledao.finance/pools" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Open />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/pools')}
          >
            Liquidity
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Astronaut />} />}
            css={getActiveStylesIfActive('/')}
          >
            Explore NFTs
          </Button>
        </Link>
        { Boolean(key?.name) &&
        <Link href={{
            pathname: '/profile',
            query: { key: key, user: key.bech32Address },
          }} passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Astronaut />} />}
            css={getActiveStylesIfActive('/profile')}
          >
            Profile NFTs
          </Button>
        </Link>
        }
        <Link href="https://app.marbledao.finance/marblenauts-nft" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Astronaut />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/marblenauts-nft')}
          >
            The Marblenauts NFTs
          </Button>
        </Link>
        <Link href="https://app.marbledao.finance/airdrop" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Airdrop />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/airdrop')}
          >
            Marble GovDrop
          </Button>
        </Link>
        <Link href="https://app.marbledao.finance/block-airdrop" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Airdrop />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/block-airdrop')}
          >
            BLOCK Airdrop
          </Button>
        </Link>
        <Link
          href="https://daodao.zone/dao/juno1zz3gc2p9ntzgjt8dh4dfqnlptdynxlgd4j7u2lutwdg5xwlm4pcqyxnecp"
          passHref
        >
          <Button
            className="top-menu"
            as="a"
            target="__blank"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Dao />} />}
            css={getActiveStylesIfActive('/dao')}
          >
            New DAO
          </Button>
        </Link>
        <Link
          href="https://daodao.zone/dao/juno1ay840g97ngja9k0f9lnywqxwk49245snw69kpwz0ry9qv99q367q3m4x8v"
          passHref
        >
          <Button
            className="top-menu"
            as="a"
            target="__blank"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Dao />} />}
            css={getActiveStylesIfActive('/dao')}
          >
            Old DAO
          </Button>
        </Link>
          <ConnectedWalletButton
            connected={Boolean(key?.name)}
            walletName={key?.name}
            onConnect={() => connectWallet(null)}
            onDisconnect={resetWalletConnection}

          />
        </StyledListForLinks>
      </MobileMenu>
    </>
  )
}

const StyledWrapper = styled('div', {
  color: '$colors$white',
  backgroundColor: '$black',
  borderRight: '1px solid $borderColors$inactive',
})

const StyledMenuContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: '$1',
  ' a':{
    color: '$colors$white',
    display: 'flex',
    ' svg':{
      color: '$colors$white',
      stroke: '$colors$white',
    },
  }
})

const StyledListForLinks = styled('div', {
  display: 'flex',
  rowGap: '$space$2',
  flexDirection: 'row',
  ' .span-mark':{
    border: '2px solid $white'
  }
})



const StyledDivForLogo = styled('div', {
  columnGap: '$space$4',
  alignItems: 'center',
  '& [data-logo]': {
    marginBottom: '$2',
  },
})

const MobileMenu = styled('div', {

})
