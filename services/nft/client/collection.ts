import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Coin } from '@cosmjs/stargate'

export interface CollectionContractConfig {
  owner: string
  cw20_address: string
  cw721_address: string
  max_tokens: number
  name: string
  symbol: string
  unused_token_id: number
  royalty: number
}


export interface CollectionInstance {
  readonly contractAddress: string

  getPrice: (token_id: number[]) => Promise<number>
  getConfig: () => Promise<CollectionContractConfig>
}

export interface CollectionTxInstance {
  readonly contractAddress: string
  //actions
  changeContract: (sender: string, cw721_address: string) => Promise<string>
  changeOwner: (sender: string, owner: string) => Promise<string>
  changeCw721Owner: (sender: string, owner: string) => Promise<string>
}

export interface CollectionContract {
  use: (client: CosmWasmClient) => CollectionInstance
  useTx: (client: SigningCosmWasmClient) => Partial<CollectionTxInstance>
}

export const Collection = (contractAddress: string): CollectionContract => {
  const use = (client: CosmWasmClient): CollectionInstance => {
    const getConfig = async (): Promise<CollectionContractConfig> => {
      const result = await client.queryContractSmart(contractAddress, {
        config: {},
      })
      return result
    }
    const getPrice = async (token_id: number[]): Promise<number> => {
      const result = await client.queryContractSmart(contractAddress, {
        get_price: {token_id: token_id},
      })
      return result
    }
    return {
      contractAddress,
      getConfig,
      getPrice
    }
  }
  const useTx = (client: SigningCosmWasmClient): Partial<CollectionTxInstance> => {
    const defaultFee = {
      amount: [],
      gas: '400000',
    }
    const changeContract = async (
      sender: string,
      cw721_address: string
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { change_contract: { cw721_address: cw721_address } },
        defaultFee
      )
      return result.transactionHash
    }
    const changeOwner = async (
      sender: string,
      owner: string
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { change_owner: { owner: owner } },
        defaultFee
      )
      return result.transactionHash
    }
    const changeCw721Owner = async (
      sender: string,
      owner: string
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { change_cw721_owner: { owner: owner } },
        defaultFee
      )
      return result.transactionHash
    }
    return {
      contractAddress,
      changeContract,
      changeOwner,
      changeCw721Owner
    }
  }
  return {use, useTx}
}