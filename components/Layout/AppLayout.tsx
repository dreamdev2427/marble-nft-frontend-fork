//import styled from 'styled-components'
import { styled } from '../theme'
import { NavigationSidebar } from './NavigationSidebar'
import { FooterBar } from './FooterBar'
import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module'
import { APP_NAME } from '../../util/constants'
import { Text } from '../Text'
import { Button } from '../Button'

const tagManagerArgs = {
    gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
}

//TagManager.initialize(tagManagerArgs)

export const AppLayout = ({
  footerBar = <FooterBar />,
  children,
}) => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <>
      <StyledWrapper>
        <NavigationSidebar openNav={openNav} setOpenNav={setOpenNav} />
        <StyledBackground className="container main-section">
          <StyledContainer>
          <main>{children}</main>
          </StyledContainer>
        </StyledBackground>
      {/*  <StyledBottom className="container main-bottom">
          <Container className="middle mauto jc-space-between">
            <Text variant="legend" css={{ paddingRight: '$20', color: '$textColors$disabled', fontSize: '$8' }}>
              {APP_NAME} v{process.env.NEXT_PUBLIC_APP_VERSION}
            </Text>
            <StyledDivForGrid>
              <Button className="link-feedback" css={{fontSize: '$8'}}
                as="a"
                href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}
                target="__blank"
                variant="ghost"
              >
                Provide feedback
              </Button>
            </StyledDivForGrid>
          </Container>
        </StyledBottom>*/}
        <StyledFooter className="footer">
          <StyledFooterWrapper className="container">
            <StyledContainer>
            {footerBar}
            </StyledContainer>
          </StyledFooterWrapper>
        </StyledFooter>
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled('div', {
  display: 'block',
  backgroundColor: '$white',
})

const StyledContainer = styled('div', {
  position: 'relative',
  zIndex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 40px',
})

const StyledBackground = styled('div', {
position: 'relative',
zIndex: '1',
display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between',
padding: '0 40px',
})

const StyledFooter = styled('div', {
position: 'relative',
zIndex: '1',
display: 'flex',
marginTop: '100px',
flexDirection: 'column',
justifyContent: 'space-between',
padding: '40px 0 0 0',
backgroundColor: '$backgroundColors$footer',
})

const StyledFooterWrapper = styled('div', {
  position: 'relative',
  zIndex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 40px',
})
const StyledBottom = styled('div', {
position: 'relative',
zIndex: '1',
display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between',
padding: '0 $space$20',
marginTop: '24px',
})
const Container = styled('div', {
  display: 'flex',
})

const StyledDivForGrid = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  flexGrow: '1',
  rowGap: '$space$12',
  '& a': {
    padding: '0px',
    '&:hover': {
      background: 'transparent',
    }
  }
})
