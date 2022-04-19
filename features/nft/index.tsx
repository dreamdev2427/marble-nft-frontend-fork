import { Stack, Image, Heading, Box, Progress } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { CW721, Marble, useSdk } from 'services/nft'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { styled } from '@stitches/react'
import { PageHeader } from 'components/Layout/PageHeader'
import { Text } from '../../components/Text'

import { walletState } from '../../state/atoms/walletAtoms'
import { NFTStatus } from './NFTStatus'
import { PreSale } from './PreSale'
import { PublicSale } from './PublicSale'

const totalNFTs = 1001
const priceNFTs = 5
const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721_CONTRACT || ''

const NFT = () => {
  const { client } = useSdk()

  const [mintedNFTs, setMintedNFTs] = useState<number>(50)
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [royalties, setRoyalties] = useState(0)
  const [priceForPublic, setPriceForPublic] = useState(0)
  const [maxToken, setMaxToken] = useState(0)
  const [soldCnt, setSoldCnt] = useState(0)
  const [isPreSale, setPreSale] = useState(0)
  const [isPublicSale, setPublicSale] = useState(0)

  const loadNfts = useCallback(async () => {
    if (!client) return
    const marbleContract = Marble(PUBLIC_CW721_CONTRACT).use(client)
    const contractConfig = await marbleContract.getConfig()
    setMaxToken(contractConfig.max_tokens)
    setSoldCnt(contractConfig.sold_cnt)
    setRoyalties(contractConfig.royalty)

    console.log("cw721:", contractConfig.cw721_address)
    const contract = CW721(contractConfig.cw721_address).use(client)
    const numTokens = await contract.numTokens()
    
    setMintedNFTs(numTokens)
  }, [client])

  const onBuy = useCallback(async () => {
    if (!address || !signingClient) {
      return
    }

    const contract = Marble(PUBLIC_CW721_CONTRACT).use(client)
    const contractConfig = await contract.getConfig()

    const marbleContract = Marble(contractConfig.cw721_address).useTx(
      signingClient
    )
    const result = await marbleContract.buyNative(address, {})
    console.log(result)
    loadNfts()
  }, [client, signingClient, address])
  useEffect(() => {
    loadNfts()
  }, [loadNfts])

  return (
    <>

      <PageHeader title="The Marblenauts" subtitle="The first official NFT collection of Marble DAO" />
      <StyledDivForWrapper>
        <StyledDivForMint className="mint-section">
          <StyledDivForMint className="mint-action">
            <Text variant="primary" css={{ paddingBottom: '$4' }}>
            The Marblenauts is a special collection of 1001 Cosmosnauts made of marble with DAO, rewards and airdrop for owners. Each NFT provides the membership to exclusive contents and incentives.
            </Text>
            <StyledElementForCard kind="wrapper">
              <StyledElementForCard kind="content">
                <Text variant="secondary">
                • Marblenauts owners receive the Airdrop of 5,000,000 $BLOCK and 100 $MARBLE<br></br>
                • Marblenauts owners can vote on Marble DAO<br></br>
                • Marblenauts owners can earn rewards on $BLOCK pools<br></br>
                </Text>
              </StyledElementForCard>
            </StyledElementForCard>
            <StyledCreator>
              Created by: The Sculptor
            </StyledCreator>
            <NFTStatus totalNFTs={maxToken} royalties={royalties} mintedNFTs={mintedNFTs}></NFTStatus>
            {/* <PreSale></PreSale> */}
            <PublicSale price={priceForPublic} maxToken={maxToken}></PublicSale>
            <StyledContainer>
              <Button size="large" onClick={onBuy}>Mint
              </Button>
            </StyledContainer>
          </StyledDivForMint>
          <StyledDivForMint className="mint-img">
            <StyledContainer>
              <StyledImage src="/marblenauts.gif" alt="Marblenauts" />
            </StyledContainer>
          </StyledDivForMint>
        </StyledDivForMint>

        {/* <StyledContainer>
          <Progress
            width="65%"
            h={3}
            colorScheme="black"
            bg="grey"
            value={(mintedNFTs * 100) / totalNFTs}
          />
        </StyledContainer> */}

      </StyledDivForWrapper>
    </>
  )
}

export default NFT

const StyledDivForWrapper = styled('div', {
  borderRadius: '$radii$4',
  border: '$borderWidths$1 solid $borderColors$default',
  boxShadow: '0px 4px 24px $borderColors$shadow',
  padding: '3rem 4rem',
})

const StyledCreator = styled('h3', {
  paddingTop: '$8',
  paddingBottom: '$8',
})

const StyledDivForMint = styled('div', {
  display: 'flex',
})

const StyledElementForCard = styled('div', {
  variants: {
    kind: {
      wrapper: {
        background: '$backgroundColors$main',
        borderRadius: '$2',
        padding: '$9 $12',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',

      },
      content: {
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: '$space$10',
        position: 'relative',
        zIndex: 1,
      },
    },
  },
})

const StyledContainer = styled('div', {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  aligntItmes: 'center',
})

const StyledImage = styled('img', {
  width: '90%',
})
