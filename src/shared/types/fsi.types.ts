export interface Deposit {
  bankId: string
  bankType: string
  balanceINR: number
}

export interface FixedDeposit {
  bankId: string
  principalINR: number
}

export interface Transaction {
  txnId: string
  amountINR: number
  timestamp: string
  merchantId?: string
  mcc?: number
}

export interface Subscription {
  merchantName: string
  monthlyAmountINR: number
}

export interface Profile {
  income: number
}

export interface LiquidAssets {
  savingsBalanceINR: number
  liquidMutualFundsINR: number
}
