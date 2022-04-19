import { styled } from '@stitches/react'
import { useIBCAssetInfo } from 'hooks/useIBCAssetInfo'
import { Button } from 'components/Button'
import { Text } from '../../../components/Text'
import { IconWrapper } from '../../../components/IconWrapper'
import { HTMLProps } from 'react'
import { __TRANSFERS_ENABLED__ } from '../../../util/constants'
import { ArrowUp } from '../../../icons'

export enum AssetCardState {
  fetching = 'FETCHING',
  active = 'ACTIVE',
}

type AssetCardProps = Exclude<HTMLProps<HTMLDivElement>, 'children'> & {
  tokenSymbol?: string
  onActionClick?: (args: {
    tokenSymbol: string
    actionType: 'deposit' | 'withdraw'
  }) => void
  balance?: number
  state?: AssetCardState
}

export const AssetCard = ({
  tokenSymbol,
  onActionClick,
  balance,
  state,
  ...htmlProps
}: AssetCardProps) => {
  const { symbol, name, logoURI } = useIBCAssetInfo(tokenSymbol) || {}

  const handleDepositClick = () =>
    onActionClick({
      tokenSymbol: symbol,
      actionType: 'deposit',
    })

  const handleWithdrawClick = () =>
    onActionClick({
      tokenSymbol: symbol,
      actionType: 'withdraw',
    })

  if (state === AssetCardState.fetching) {
    return (
      <StyledElementForCard {...(htmlProps as any)} kind="wrapper">
        <StyledElementForCard kind="content">
          <StyledElementForToken>
            <StyledTokenImage as="div" />
          </StyledElementForToken>
        </StyledElementForCard>
        <div />
      </StyledElementForCard>
    )
  }

  return (
    <StyledElementForCard {...(htmlProps as any)} kind="wrapper">
      <StyledElementForCard kind="content">
        <StyledElementForToken>
          <StyledTokenImage src={logoURI} />
          <Text variant="title" css={{ fontSize: '$15' }}>
            {balance} {name}{' '}
            {!__TRANSFERS_ENABLED__ && (
              <Text css={{ paddingLeft: '$8' }} as="span" variant="title">
                Coming soon
              </Text>
            )}
          </Text>
        </StyledElementForToken>
      </StyledElementForCard>

      <StyledElementForCard className="action-group" kind="actions">
        <Button
          disabled={!__TRANSFERS_ENABLED__}
          onClick={__TRANSFERS_ENABLED__ ? handleDepositClick : undefined}
          iconLeft={<IconWrapper icon={<ArrowUp />} rotation="180deg" />}
          css={{ fontSize: '$14' }}
          variant="ghost"
        >
          Deposit
        </Button>
        <Button
          disabled={!__TRANSFERS_ENABLED__}
          onClick={__TRANSFERS_ENABLED__ ? handleWithdrawClick : undefined}
          iconLeft={<IconWrapper icon={<ArrowUp />} />}
          css={{ fontSize: '$14' }}
          variant="ghost"
        >
          Withdraw
        </Button>
      </StyledElementForCard>

      {state === AssetCardState.active && (
        <StyledElementForCard kind="background" />
      )}
    </StyledElementForCard>
  )
}

const StyledElementForCard = styled('div', {
  variants: {
    kind: {
      wrapper: {
        padding: '$9 $12',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '$radii$4',
        backgroundColor: '$backgroundColors$main',
      },
      content: {
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: '$space$10',
        position: 'relative',
        zIndex: 1,
      },
      actions: {
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: '$space$21',
        position: 'relative',
        zIndex: 1,
      },
      background: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      },
    },
  },
})

const StyledElementForToken = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: '7px',
  minWidth: 120,
  alignItems: 'center',
})

const StyledTokenImage = styled('img', {
  width: 26,
  height: 26,
  borderRadius: '50%',
  backgroundColor: '#ccc',
})
