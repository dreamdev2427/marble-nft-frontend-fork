import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { Coin } from '@cosmjs/stargate'

export interface ContractConfig {
  airdrop: boolean
  cw20_address: string
  cw721_address: string
  extension: string
  max_tokens: number
  name: string
  native_denom: string
  owner: string
  pay_native: boolean
  royalty: number
  sold_cnt: number
  symbol: string
  unused_token_id: number
}

export interface MerkleRootResponse {
  expiration: {
    never: any
  }
  merkle_root: string
  stage: number
}

export interface MarbleInstance {
  readonly contractAddress: string

  /**
   * @returns owner address
   */
  getConfig: () => Promise<ContractConfig>
  merkleRoot: () => Promise<MerkleRootResponse>
  isClaimed: (address: string) => Promise<boolean>
}

export interface MarbleTxInstance {
  readonly contractAddress: string

  // actions
  mint: (sender: string, uri: string, price: number) => Promise<string>
  batchMint: (sender: string, uri: string[], price: number[]) => Promise<string>
  buyNative: (
    sender: string,
    tokenId?: Record<string, number>
  ) => Promise<string>
  moveNative: (tokenId: string, receipient: string) => Promise<string>
  registerMerkleRoot: (
    merkle_root: string,
    expiration: string,
    start: string
  ) => Promise<string>
  claim: (proof: string[]) => Promise<string>
  changeContract: (cw721_address: string) => Promise<string>
  changeOwner: (owner: string) => Promise<string>
  updatePrice: (tokenId: string[], price: number[]) => Promise<string>
}

export interface MarbleContract {
  use: (client: CosmWasmClient) => MarbleInstance
  useTx: (client: SigningCosmWasmClient) => Partial<MarbleTxInstance> //TODO: implement all actions
}

export const Marble = (contractAddress: string): MarbleContract => {
  const use = (client: CosmWasmClient): MarbleInstance => {
    const getConfig = async (): Promise<ContractConfig> => {
      const result = await client.queryContractSmart(contractAddress, {
        get_config: {},
      })
      return result
    }

    const merkleRoot = async (): Promise<MerkleRootResponse> => {
      const result = await client.queryContractSmart(contractAddress, {
        merkle_root: {},
      })
      return result
    }

    const isClaimed = async (address: string): Promise<boolean> => {
      const result = await client.queryContractSmart(contractAddress, {
        is_claimed: { address: address },
      })
      return result
    }
    
    return {
      contractAddress,
      getConfig,
      merkleRoot,
      isClaimed,
    }
  }

  const useTx = (client: SigningCosmWasmClient): Partial<MarbleTxInstance> => {
    const defaultFee = {
      amount: [],
      gas: '400000',
    }

    const buyNative = async (
      sender: string,
      tokenId?: Record<string, number>
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { buy_native: { token_id: tokenId } },
        defaultFee
      )
      return result.transactionHash
    }

    const batchMint = async (
      sender: string,
      uri: string[],
      price: number[]
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { batch_mint: { uri: uri, price: price } },
        defaultFee
      )
      return result.transactionHash
    }

    const mint = async (
      sender: string,
      uri: string,
      price: number
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { mint: { uri: uri, price: price } },
        defaultFee
      )
      return result.transactionHash
    }

    return {
      contractAddress,
      buyNative,
      batchMint,
      mint,
    }
  }
  return { use, useTx }
}
