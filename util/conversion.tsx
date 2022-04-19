export const protectAgainstNaN = (value: number) => (isNaN(value) ? 0 : value)

export function convertMicroDenomToDenom(
  value: number | string,
  decimals: number = 0
): number {
  if (decimals === 0) return Number(value)

  return protectAgainstNaN(Number(value) / Math.pow(10, decimals))
}

export function convertDenomToMicroDenom(
  value: number | string,
  decimals: number = 0
): number {
  if (decimals === 0) return Number(value)

  return protectAgainstNaN(
    parseInt(String(Number(value) * Math.pow(10, decimals)), 10)
  )
}

export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase()
}

export function convertToFixedDecimals(value: number | string): string {
  const amount = Number(value)
  return amount > 0.01 ? amount.toFixed(2) : String(amount)
}

export const formatTokenName = (name: string) => {
  if (name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
  }
  return ''
}

export const createBalanceFormatter = ({
  maximumFractionDigits = 2,
  ...options
}: Omit<
  Parameters<typeof Intl.NumberFormat>[1],
  'style' | 'currency'
> = {}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
    ...options,
    style: 'currency',
    currency: 'USD',
  })

  return (
    value: string | number,
    { includeCommaSeparation = false, applyNumberConversion = true } = {}
  ) => {
    const formattedValue = formatter
      .format(!isNaN(value as number) ? (value as number) : 0)
      .replace(/\$/g, '')

    if (includeCommaSeparation) {
      return formattedValue
    }

    const rawValue = formattedValue.replace(/\,/g, '')
    if (applyNumberConversion) {
      return Number(rawValue)
    }

    return rawValue
  }
}

export const formatTokenBalance = createBalanceFormatter()

export const dollarValueFormatterWithDecimals = createBalanceFormatter({
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

export const dollarValueFormatter = createBalanceFormatter({
  maximumFractionDigits: 2,
})

export const formatTimestamp = (timestamp: number) => {
  const days = Math.floor(timestamp / 86400)
  timestamp -= days * 86400
  const hours = Math.floor(timestamp / 3600)
  timestamp -= hours * 3600
  const minutes = Math.floor(timestamp / 60)
  return `${days} days ${hours} hours ${minutes} minutes`
}
