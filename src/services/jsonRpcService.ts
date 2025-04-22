import { JsonRpc } from 'eosjs'

const waxNode = 'https://api.waxsweden.org'

class JsonRpcService {
  private readonly waxNode: string
  private rpc: JsonRpc

  constructor(waxNode: string) {
    this.waxNode = waxNode
    this.rpc = new JsonRpc(this.waxNode, { fetch })
  }

  getTableRows = (
    code: string, table: string, scope: string,
    limit: number, lowerBound?: string, upperBound?: string,
    indexPosition = 1,
  ) => {
    return this.rpc.get_table_rows({
      code: code,
      table: table,
      scope: scope,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      json: true,
      limit: limit,
      index_position: indexPosition,
      key_type: 'i64',
    })
  }
}

export const jsonRpcService = new JsonRpcService(waxNode)
