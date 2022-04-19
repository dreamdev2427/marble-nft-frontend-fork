import { styled } from '@stitches/react'
import { Text } from '../../components/Text'

export function NFTStatus({ totalNFTs, royalties, mintedNFTs }) {
  return (
    <>
      <StyledGroup className="nft-status">
        <StyledNFTInfo>
          <Text>Total NFTs</Text>
          <h3>{totalNFTs}</h3>
        </StyledNFTInfo>
        <StyledNFTInfo>
          <Text>Royalties</Text>
          <h3>{Number((royalties / totalNFTs * 100).toFixed(2))}%</h3>
        </StyledNFTInfo>
        <StyledNFTInfo>
          <Text>Minted(%)</Text>
          <h3>{Number((mintedNFTs / totalNFTs * 100).toFixed(2))} %</h3>
        </StyledNFTInfo>
      </StyledGroup>
    </>
  )
}

const StyledGroup = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})
const StyledNFTInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$radii$1',
  border: '$borderWidths$1 solid $borderColors$default',
  padding: '0.8rem',
})
