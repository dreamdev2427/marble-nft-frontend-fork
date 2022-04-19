import { styled } from '@stitches/react'
import { Text } from '../../../components/Text'

export const AssetInfo = () => {
  return (
    <StyledElementForCard kind="wrapper">
      <StyledElementForToken>
        <Text css={{ padding: '$4 0' }}>Total Assets</Text>
        <Text variant="title" css={{ fontSize: '$15' }}>
          $663,813
        </Text>
      </StyledElementForToken>
      <StyledElementForToken>
        <Text css={{ padding: '$4 0' }}>Available Assets</Text>
        <Text variant="title" css={{ fontSize: '$15' }}>
          $660,364
        </Text>
      </StyledElementForToken>
      <StyledElementForToken>
        <Text css={{ padding: '$4 0' }}>Bonded Assets</Text>
        <Text variant="title" css={{ fontSize: '$15' }}>
          $3,453
        </Text>
      </StyledElementForToken>
      {/*<StyledElementForToken>
        <Text css={{ padding: '$4 0' }}>Staked Block</Text>
        <Text variant="title" css={{ fontSize: '$15' }}>
          $0
        </Text>
      </StyledElementForToken>*/}
    </StyledElementForCard>
  )
}

const StyledElementForCard = styled('div', {
  variants: {
    kind: {
      wrapper: {
        padding: '$18 $22',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '$radii$4',
        backgroundColor: '$backgroundColors$main',
      },
    },
  },
})

const StyledElementForToken = styled('div', {
  display: 'flex',
  flex: 1,
  minWidth: 150,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})
