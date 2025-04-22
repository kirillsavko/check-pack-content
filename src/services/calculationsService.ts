import Decimal from 'decimal.js'

class CalculationsService {
  getPercentage(part: number, total: number): number {
    if (total === 0) return 0
    const partDecimal = new Decimal(part)
    return partDecimal.div(total).mul(100).toNumber()
  }
}

export const calculationsService = new CalculationsService()
