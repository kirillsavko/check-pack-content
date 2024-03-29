import {useState} from "react";
import { JsonRpc } from "eosjs";

export type JsonRpcsHook = ReturnType<typeof useJsonRpc>

const waxNode = 'https://api.waxsweden.org'

export type PackRolls = {
  outcomes: { odds: number, template_id: number }[]
  roll_id: number
  total_odds: number
}

export function useJsonRpc () {
  const [packRolls, setPackRolls] = useState<PackRolls[]>([])
  const [gettingPackRolls, setGettingPackRolls] = useState(false)
  const [gettingPackRollsError, setGettingPackRollsError] = useState('')

  const rpc = new JsonRpc(waxNode)

  const getTableRows = (
    code: string, table: string, scope: string,
    limit: number, lowerBound?: string, upperBound?: string,
    indexPosition = 1
  ) => {
    return rpc.get_table_rows({
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

  const getPackRolls = async (templateId: string) => {
    setPackRolls([])
    setGettingPackRolls(true)
    const result = await getTableRows('atomicpacksx', 'packs', 'atomicpacksx', 1000, templateId, templateId, 2)
    if (result.rows[0].pack_id) {
      return getTableRows('atomicpacksx', 'packrolls', result.rows[0].pack_id, 1000)
        .then(res => setPackRolls(res.rows))
        .catch(e => setGettingPackRollsError(e.message))
        .finally(() => setGettingPackRolls(false))
    }
    return []
  }

  return {
    /**
     * List of pack rolls for a pack
     */
    packRolls,
    /**
     * Getting pack rolls loading flag
     */
    gettingPackRolls,
    /**
     * Getting pack rolls error
     */
    gettingPackRollsError,
    /**
     * Gets rolls for a specific pack
     */
    getPackRolls,
    /**
     * Resets an error from getting pack rolls to the initial state
     */
    resetError: () => setGettingPackRollsError(''),
    /**
     * Resets pack rolls array to the initial state
     */
    resetPackRolls: () => setPackRolls([])
  }
}
