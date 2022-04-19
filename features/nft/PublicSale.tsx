import { styled } from '@stitches/react'
import { Text } from '../../components/Text'

export function PublicSale({ price, maxToken }) {
  return (
    <>
      <StyledSaleHeader>
        <h2>Public sale</h2>
        <span className="sale-status">Coming soon</span>
      </StyledSaleHeader>
      <StyledGroup>
        <Text>Price {price} Juno</Text>
        {/*<Text className="point" css={{marginLeft: '$4',}}>Max {maxToken} tokens</Text>*/}
      </StyledGroup>
    </>
  )
}

const StyledSaleHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '$8',
  marginBottom: '$3',
})
const StyledGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '$radii$1',
  border: '$borderWidths$1 solid $borderColors$default',
  padding: '0.8rem',
  columnGap: '$12',
})
