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
import { UpRightArrow, Exchange, Presale, Open, Dao, NFTs, Dash, NewDash, Airdrop, Astronaut, Nav } from '../../icons'
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
    pathname === path ? { borderBottom: '3px solid $white', background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 100%)" } : {borderBottom: '3px solid transparent', background: 'transparent' }



  const StyledImageForLogoText = styled('img', {
    borderRadius: '0%',
  })

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
              <StyledImageForLogoText className="logo-img" src="/images/logotext.png" />
            </StyledDivForLogo>
          </Link>
          <StyledListForLinks className="top-menu-links">
            <Link href="/" passHref>
              <Button className="top-menu"
                as="a"
                variant="ghost"
                css={getActiveStylesIfActive('/')}
              >
                Explore
              </Button>
            </Link>
            <Link href="/transfer" passHref>
              <Button className="top-menu"
                as="a"
                variant="ghost"
                css={getActiveStylesIfActive('/transfer')}
              >
                Collection
              </Button>
            </Link>
            <Link href="/pools" passHref>
              <Button className="top-menu"
                as="a"
                variant="ghost"
                css={getActiveStylesIfActive('/pools')}
              >
                Profile
              </Button>
            </Link>

            <Link
              href="/nft"
              passHref
            >
              <Button className="top-menu"
                as="a"
                variant="ghost"
                css={getActiveStylesIfActive('/nft')}
              >
              NFT
              </Button>
            </Link>

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
        {/*<Link href="/" passHref>
            <Button className="top-menu"
              as="a"
              variant="ghost"
              iconCenter={<IconWrapper icon={<NewDash />} />}
              css={getActiveStylesIfActive('/dashboard')}
            >
              Dashboard
            </Button>
          </Link>*/}
          <Link href="/" passHref>
            <Button className="top-menu"
              as="a"
              variant="ghost"
              iconCenter={<IconWrapper icon={<Exchange />} />}
              css={getActiveStylesIfActive('/')}
            >
              Explore
            </Button>
          </Link>
          <Link href="/transfer" passHref>
            <Button className="top-menu"
              as="a"
              variant="ghost"
              iconCenter={<IconWrapper icon={<UpRightArrow />} />}
              css={getActiveStylesIfActive('/transfer')}
            >
              Collection
            </Button>
          </Link>
          <Link href="/pools" passHref>
            <Button className="top-menu"
              as="a"
              variant="ghost"
              iconCenter={<IconWrapper icon={<Open />} />}
              css={getActiveStylesIfActive('/pools')}
            >
              Profile
            </Button>
          </Link>
          <Link
            href="/nft"
            passHref
          >
            <Button className="top-menu"
              as="a"
              variant="ghost"
              iconCenter={<IconWrapper icon={<Astronaut />} />}
              css={getActiveStylesIfActive('/nft')}
            >
            NFT
            </Button>
          </Link>
          
        </StyledListForLinks>
      </MobileMenu>
    </>
  )
}

const StyledWrapper = styled('div', {
  color: '$colors$white',
  backgroundColor: '$black',
  overflow: 'auto',
  borderRight: '1px solid $borderColors$inactive',
})

const StyledMenuContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: '$2',
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
