import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { OfflineSigner } from '@cosmjs/proto-signing'

import { AppConfig } from '../config/network'

export type WalletLoader = (
  chainId: string,
  addressPrefix?: string
) => Promise<OfflineSigner>

export async function loadKeplrWallet(chainId: string): Promise<OfflineSigner> {
  const anyWindow = window as any
  if (!anyWindow.getOfflineSignerAuto) {
    throw new Error('Keplr extension is not available')
  }

  const signer = anyWindow.getOfflineSignerAuto(chainId)

  return Promise.resolve(signer)
}

// this creates a new connection to a server at URL,
export async function createClient(
  config: AppConfig,
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(
      `${config.gasPrice}${config.token.coinMinimalDenom}`
    ),
  })
}

export function createSimpleClient(config: AppConfig): Promise<CosmWasmClient> {
  return CosmWasmClient.connect(config.rpcUrl)
}
