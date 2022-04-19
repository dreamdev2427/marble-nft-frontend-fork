interface IBondingInfo {
  owner: string
  reward_token_address: string
  stake_token_address: string
  reward_amount: string
  stake_amount: string
  daily_reward_amount: string
  apy_prefix: string
  reward_interval: number
  lock_days: number
}

interface IMyBondingInfo {
  address: string
  amount: string
  last_time: number
  reward: string
  start_time: number
}
