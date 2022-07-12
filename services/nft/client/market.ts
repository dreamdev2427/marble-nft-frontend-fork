import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { Coin } from '@cosmjs/stargate'
import { unsafelyGetDefaultExecuteFee } from 'util/fees'
export interface MarketContractConfig {
  owner: string
  max_collection_id: number
  collection_code_id: number
  cw721_base_code_id: number
}
export interface OfferResponse {
  contract: string
  id: string
  list_price: Coin
  seller: string
  token_id: string
}

export interface OffersResponse {
  offers: OfferResponse[]
}

export interface CollectionResponse {
  id: number
  collection_address: string
  cw721_address: string
  uri: string
}

export interface CollectonListResponse {
  collection: CollectionResponse[]
}

export interface MarketInstance {
  readonly contractAddress: string
  listCollections: () => Promise<CollectionResponse[]>
  config: () => Promise<MarketContractConfig>
  collection: (id: number) => Promise<CollectionResponse>
  //old functions
  numOffers: () => Promise<number>
  offer: (
    contract: string,
    tokenId: string
  ) => Promise<OfferResponse | undefined>
  offersBySeller: (
    seller: string,
    startAfter?: string,
    limit?: number
  ) => Promise<OffersResponse>
  allOffers: (startAfter?: string, limit?: number) => Promise<OffersResponse>
}

export interface MarketTxInstance {
  readonly contractAddress: string
  // actions
  addCollection: (owner: string, max_tokens: number, name: string, symbol: string, token_code_id: number, cw20_address: string, royalty: number, uri: string) => Promise<string>
  mint: (owner: string, uri: string) => Promise<string>
  
  //old functions
  buy: (sender: string, offerId: string, price: Coin) => Promise<string>
  withdraw: (sender: string, offerId: string) => Promise<string>
}

export interface MarketContract {
  use: (client: CosmWasmClient) => MarketInstance
  useTx: (client: SigningCosmWasmClient) => MarketTxInstance
}

export const Market = (contractAddress: string): MarketContract => {
  const defaultExecuteFee = unsafelyGetDefaultExecuteFee()

  const use = (client: CosmWasmClient): MarketInstance => {
    const config = async (): Promise<MarketContractConfig> => {
      const result = await client.queryContractSmart(contractAddress, {
        config: {},
      })
      return result
    }
    const listCollections = async (): Promise<CollectionResponse[]> => {
      const result = await client.queryContractSmart(contractAddress, {
        list_collections: {},
      })
      return result.list
    }
    const collection = async (id: any): Promise<CollectionResponse> => {
      const result = await client.queryContractSmart(contractAddress, {
        collection: {"id": parseInt(id)},
      })
      return result
    }
    const numOffers = async (): Promise<number> => {
      const result = await client.queryContractSmart(contractAddress, {
        get_count: {},
      })
      return result.count
    }

    const offer = async (
      contract: string,
      tokenId: string
    ): Promise<OfferResponse | undefined> => {
      const result: OffersResponse = await client.queryContractSmart(
        contractAddress,
        { get_offer: { contract, token_id: tokenId } }
      )
      return result.offers.length > 0 ? result.offers[0] : undefined
    }

    const offersBySeller = async (
      seller: string,
      startAfter?: string,
      limit?: number
    ): Promise<OffersResponse> => {
      const result = await client.queryContractSmart(contractAddress, {
        get_offers: { seller, start_after: startAfter, limit: limit },
      })
      return result
    }

    const allOffers = async (
      startAfter?: string,
      limit?: number
    ): Promise<OffersResponse> => {
      const result = await client.queryContractSmart(contractAddress, {
        all_offers: { start_after: startAfter, limit: limit },
      })
      return result
    }
    return {
      contractAddress,
      config,
      listCollections,
      collection,
      numOffers,
      offer,
      offersBySeller,
      allOffers
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
      royalty = Math.round( royalty * 1000000 )
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

    const mint = async (
      owner: string, 
      uri: string
    ): Promise<string> => {
      const result = await client.execute(
        owner,
        contractAddress,
        { 
          mint: 
          { 
            uri: uri
          } 
        },
        defaultExecuteFee
      )
      
      console.log("call end mint nft:", result)
      return result.transactionHash
    }
    const buy = async (
      sender: string,
      offerId: string,
      price: Coin
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { buy: { offering_id: offerId } },
        undefined
      )
      return result.transactionHash
    }

    const withdraw = async (
      sender: string,
      offerId: string
    ): Promise<string> => {
      const result = await client.execute(
        sender,
        contractAddress,
        { withdraw_nft: { offering_id: offerId } },
        undefined
      )
      return result.transactionHash
    }
    return {
      contractAddress,
      addCollection,
      mint,
      buy,
      withdraw
    }
  }

  return { use, useTx }
}
