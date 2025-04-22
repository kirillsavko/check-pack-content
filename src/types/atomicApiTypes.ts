/**
 * A collection groups assets, schemas and templates together and manages
 * the permissions for those. It also has a `data` field that follows a
 * unified schema meant specifically for collection infos.
 *
 * Next to handling the permissions, collections are used to provide
 * additional information to end-users. End-users are meant to see which
 * collection an asset belongs to and the serialized collection data is
 * meant to contain information like a name, description and a website URL.
 *
 * @see https://eos.api.atomicassets.io/docs/#/collections
 * @see https://github.com/pinknetworkx/atomicassets-contract/wiki/Structure#collections
 */
export type AtomicCollection<Data = Record<string, unknown>> = {
  contract: string
  collection_name: string
  // Not part of the Swagger definition but available in request responses.
  img: string | null
  name: string
  author: string
  allow_notify: boolean
  authorized_accounts: string[]
  notify_accounts: string[]
  market_fee: number
  data: Data
  /** Block is a number but returned as a string by the API. */
  created_at_block: string
  created_at_time: string
}

/**
 * A schema is used to define a data structure. It has nothing more than a
 * unique name that is used to reference it and a vector of formats, each
 * is a tuple of a unique name and a type, describing an attribute that the
 * data structure has.
 *
 * Schemas belong to a collection.
 *
 * @see https://eos.api.atomicassets.io/docs/#/schemas
 * @see https://github.com/pinknetworkx/atomicassets-contract/wiki/Structure#schemas
 */
export type AtomicSchema = {
  contract: string
  schema_name: string
  format: AtomicSchemaFormat[]
  collection: Omit<AtomicCollection, 'contract' | 'img' | 'data'>
  created_at_block: string
  created_at_time: string
}

/**
 * A format is a struct with a `name` and `type` value, needed for serialization.
 *
 * @see https://github.com/pinknetworkx/atomicassets-contract/wiki/Custom-Types#format
 */
type AtomicSchemaFormat = {
  name: string
  type:
    | 'int8'
    | 'int8[]'
    | 'int16'
    | 'int16[]'
    | 'int32'
    | 'int32[]'
    | 'int64'
    | 'int64[]'
    | 'uint8'
    | 'uint8[]'
    | 'uint16'
    | 'uint16[]'
    | 'uint32'
    | 'uint32[]'
    | 'uint64'
    | 'uint64[]'
    | 'fixed8'
    | 'fixed8[]'
    | 'fixed16'
    | 'fixed16[]'
    | 'fixed32'
    | 'fixed32[]'
    | 'fixed64'
    | 'fixed64[]'
    | 'float'
    | 'float[]'
    | 'double'
    | 'double[]'
    | 'string'
    | 'string[]'
    // `image` is an alias for `string` and signals to NFT explorers to display
    // the attribute as an image. It is expected to either include a URL
    // starting with `http` or an IPFS hash, possibly followed by a folder
    // structure (e.g. `<HASH>/common/10.jpg`).
    | 'image'
    | 'image[]'
    | 'ipfs'
    | 'ipfs[]'
    | 'bool'
    | 'bool[]'
    | 'byte'
    | 'byte[]'
}

/**
 * A template's main purpose is to save RAM costs by storing data that is
 * duplicate in a lot of similar assets only once. It is however also
 * possible to define a `max_supply` within a template, in which case it
 * could be used to group together assets with provable scarcity.
 *
 * Just like assets, templates also reference a schema, which will be used
 * to serialize the template's data.
 *
 * Templates also have a `is_transferable` and a `is_burnable` field that
 * determines whether it will be possible to transfer/burn its child assets.
 *
 * Finally, templates are optional.
 *
 * @see https://eos.api.atomicassets.io/docs/#/templates
 * @see https://github.com/pinknetworkx/atomicassets-contract/wiki/Structure#templates
 */
export type AtomicTemplate<ImmutableData = Record<string, unknown>> = {
  contract: string
  /** Id is a number but returned as a string by the API. */
  template_id: string
  /**
   * Max supply is a number but returned as a string by the API.
   *
   * When the max supply is not set, the API will respond with `"0"`
   * instead of `null`!
   */
  max_supply: string
  /** Supply is a number but returned as a string by the API. */
  issued_supply: string
  is_transferable: boolean
  is_burnable: boolean
  immutable_data: ImmutableData
  /** Block is a number but returned as a string by the API. */
  created_at_block: string
  created_at_time: string
  schema: Omit<AtomicSchema, 'contract' | 'collection'>
  collection: Omit<AtomicCollection, 'contract' | 'data'>
}

/**
 * Assets are the core of the AtomicAssets standard. They reference a
 * schema that is used to serialize the asset's data as well as a
 * collection that they belong to.
 *
 * They can also optionally reference a template, in which case the
 * serialized data of the template will be treated as if it also was part
 * of the asset's data.
 *
 * @see https://eos.api.atomicassets.io/docs/#/assets
 * @see https://github.com/pinknetworkx/atomicassets-contract/wiki/Structure#assets
 */
export type AtomicAsset<ImmutableData = Record<string, unknown>, MutableData = Record<string, unknown>> = {
  contract: string
  asset_id: string
  owner: string
  name: string
  is_transferable: boolean
  is_burnable: boolean
  /** Mint is a number but returned as a string by the API. */
  template_mint: string
  collection: Omit<AtomicCollection, 'contract' | 'data'>
  schema: Omit<AtomicSchema, 'contract' | 'collection'>
  template: Omit<AtomicTemplate<ImmutableData>, 'contract' | 'schema' | 'collection'> | null
  backed_tokens: AtomicBackedToken[]
  immutable_data: ImmutableData
  mutable_data: MutableData
  /** Immutable and mutable data together. */
  data: ImmutableData & MutableData
  burned_by_account: string | null
  /** Block is a number but returned as a string by the API. */
  burned_at_block: string | null
  burned_at_time: string | null
  /** Block is a number but returned as a string by the API. */
  updated_at_block: string
  updated_at_time: string
  /** Block is a number but returned as a string by the API. */
  minted_at_block: string
  minted_at_time: string
}

type AtomicBackedToken = {
  token_contract: string
  token_symbol: string
  token_precision: number
  amount: number
}
