import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { Coin } from '@cosmjs/stargate'
import { unsafelyGetDefaultExecuteFee } from 'util/fees'

export interface CollectionResponse {
  id: number
  collection_addr: string
  cw721_addr: string
}

export interface CollectonListResponse {
  collection: CollectionResponse[]
}

export interface MarketInstance {
  readonly contractAddress: string
  listCollections: () => Promise<CollectonListResponse>
}

export interface MarketTxInstance {
  readonly contractAddress: string
  // actions
  addCollection: (owner: string, max_tokens: number, name: string, symbol: string, token_code_id: number, cw20_address: string, royalty: number, uri: string) => Promise<string>
}

export interface MarketContract {
  use: (client: CosmWasmClient) => MarketInstance
  useTx: (client: SigningCosmWasmClient) => MarketTxInstance
}

export const Market = (contractAddress: string): MarketContract => {
  const defaultExecuteFee = unsafelyGetDefaultExecuteFee()

  const use = (client: CosmWasmClient): MarketInstance => {
    const listCollections = async (): Promise<CollectonListResponse> => {
      const result = await client.queryContractSmart(contractAddress, {
        list_collections: {},
      })
      return result.list
    }

    return {
      contractAddress,
      listCollections,
    }
  }

  const useTx = (client: SigningCosmWasmClient): MarketTxInstance => {
    const addCollection = async (
      owner: string, 
      maxTokens: number, 
      name: string, 
      symbol: string, 
      tokenCodeId: number, 
      cw20Address: string, 
      royalty: number, 
      uri: string
    ): Promise<string> => {
      const result = await client.execute(
        owner,
        contractAddress,
        { 
          add_collection: 
          { 
            owner: owner, 
            max_tokens: maxTokens, 
            name: name, 
            symbol: symbol, 
            token_code_id: tokenCodeId, 
            cw20_address: cw20Address, 
            royalty: royalty, 
            uri: uri
          } 
        },
        defaultExecuteFee
      )
      
      console.log("call end add collection:", result)
      return result.transactionHash
    }
    return {
      contractAddress,
      addCollection
    }
  }

  return { use, useTx }
}
