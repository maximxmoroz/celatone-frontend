// eslint-disable-next-line @typescript-eslint/naming-convention
export enum CELATONE_QUERY_KEYS {
  // SIMULATE
  SIMULATE_FEE = "CELATONE_QUERY_SIMULATE_FEE",
  SIMULATE_FEE_STORE_CODE = "CELATONE_QUERY_SIMULATE_FEE_STORE_CODE",
  SIMULATE_FEE_STORE_CODE_PROPOSAL = "CELATONE_QUERY_SIMULATE_FEE_STORE_CODE_PROPOSAL",
  // BALANCES
  BALANCES = "CELATONE_QUERY_BALANCES",
  // CONTRACT,CODE LCD
  CODE_INFO = "CELATONE_QUERY_CODE_INFO",
  CONTRACT_DETAIL_BY_CONTRACT_ADDRESS = "CELATONE_QUERY_CONTRACT_DETAIL_BY_CONTRACT_ADDRESS",
  CONTRACT_CW2_INFO = "CELATONE_QUERY_CONTRACT_CW2_INFO",
  CONTRACT_INFO = "CELATONE_QUERY_CONTRACT_INFO",
  CONTRACT_QUERY_CMDS = "CELATONE_QUERY_CONTRACT_QUERY_CMDS",
  CONTRACT_QUERY = "CELATONE_QUERY_CONTRACT_QUERY",
  CONTRACT_STATE = "CELATONE_QUERY_CONTRACT_STATE",
  // ACCOUNT
  ACCOUNT_ID = "CELATONE_QUERY_ACCOUNT_ID",
  ACCOUNT_TYPE = "CELATONE_QUERY_ACCOUNT_TYPE",
  // ASSET
  ASSET_INFOS = "CELATONE_QUERY_ASSET_INFOS",
  ASSET_INFO_LIST = "CELATONE_QUERY_ASSET_INFO_LIST",
  // BLOCK
  BLOCKS = "CELATONE_QUERY_BLOCKS",
  BLOCK_INFO = "CELATONE_QUERY_BLOCK_INFO",
  LATEST_BLOCK_INFO = "CELATONE_QUERY_LATEST_BLOCK_INFO",
  AVERAGE_BLOCK_TIME = "CELATONE_QUERY_AVERAGE_BLOCK_TIME",
  // CODE GQL
  CODES = "CELATONE_QUERY_CODES",
  CODES_BY_WALLET_ADDRESS = "CELATONE_QUERY_CODES_BY_WALLET_ADDRESS",
  CODES_BY_WALLET_ADDRESS_PAGINATION = "CELATONE_QUERY_CODES_BY_WALLET_ADDRESS_PAGINATION",
  CODES_BY_WALLET_ADDRESS_COUNT = "CELATONE_QUERY_CODES_BY_WALLET_ADDRESS_COUNT",
  CODES_BY_IDS = "CELATONE_QUERY_CODES_BY_IDS",
  CODE_DATA_BY_ID = "CELATONE_QUERY_CODE_DATA_BY_ID",
  // CONTRACT GQL
  CONTRACTS = "CELATONE_QUERY_CONTRACTS",
  CONTRACTS_BY_ADMIN = "CELATONE_QUERY_CONTRACT_BY_ADMIN",
  CONTRACTS_BY_ADMIN_PAGINATION = "CELATONE_QUERY_CONTRACT_BY_ADMIN_PAGINATION",
  CONTRACTS_BY_ADMIN_COUNT = "CELATONE_QUERY_CONTRACT_BY_ADMIN_COUNT",
  CONTRACT_INSTANTIATE_DETAIL = "CELATONE_QUERY_CONTRACT_INSTANTIATE_DETAIL",
  INSTANTIATED_COUNT_BY_WALLET_ADDRESS = "CELATONE_QUERY_INSTANTIATED_COUNT_BY_WALLET_ADDRESS",
  INSTANTIATED_LIST_BY_WALLET_ADDRESS = "CELATONE_QUERY_INSTANTIATED_LIST_BY_WALLET_ADDRESS",
  ADMINS_BY_CONTRACTS = "CELATONE_QUERY_ADMINS_BY_CONTRACTS",
  CONTRACT_MIGRATION_HISTORIES_PAGINATION = "CELATONE_QUERY_CONTRACT_MIGRATION_HISTORIES_PAGINATION",
  CONTRACT_MIGRATION_HISTORIES_COUNT = "CELATONE_QUERY_CONTRACT_MIGRATION_HISTORIES_COUNT",
  CONTRACTS_BY_CODE_ID_PAGINATION = "CELATONE_QUERY_CONTRACTS_BY_CODE_ID_PAGINATION",
  CONTRACTS_BY_CODE_ID_COUNT = "CELATONE_QUERY_CONTRACTS_BY_CODE_ID_COUNT",
  CONTRACTS_BY_INIT_WALLET_ADDRESS = "CELATONE_QUERY_CONTRACTS_BY_INIT_WALLET_ADDRESS",
  // X/STAKING
  STAKING_PARAMS = "CELATONE_QUERY_STAKING_PARAMS",
  DELEGATIONS_BY_ADDRESS = "CELATONE_QUERY_DELEGATIONS_BY_ADDRESS",
  DELEGATION_REWARDS_BY_ADDRESS = "CELATONE_QUERY_DELEGATION_REWARDS_BY_ADDRESS",
  UNBONDINGS_BY_ADDRESS = "CELATONE_QUERY_UNBONDINGS_BY_ADDRESS",
  REDELEGATIONS_BY_ADDRESS = "CELATONE_QUERY_REDELEGATIONS_BY_ADDRESS",
  COMMISSION_BY_VAL_ADDRESS = "CELATONE_QUERY_COMMISSION_BY_VAL_ADDRESS",
  VALIDATORS = "CELATONE_QUERY_VALIDATORS",
  VALIDATOR_INFO_BY_ADDRESS = "CELATONE_QUERY_VALIDATOR_INFO_BY_ADDRESS",
  VALIDATOR_IDENTITY_BY_ADDRESS = "CELATONE_QUERY_VALIDATOR_IDENTITY_BY_ADDRESS",
  // FAUCET
  FAUCET_INFO = "CELATONE_QUERY_FAUCET_INFO",
  // X/GOV
  RELATED_PROPOSALS_BY_CONTRACT_ADDRESS_PAGINATION = "CELATONE_QUERY_RELATED_PROPOSALS_BY_CONTRACT_ADDRESS_PAGINATION",
  RELATED_PROPOSALS_BY_CONTRACT_ADDRESS_COUNT = "CELATONE_QUERY_RELATED_PROPOSALS_BY_CONTRACT_ADDRESS_COUNT",
  PROPOSALS_BY_WALLET_ADDRESS_PAGINATION = "CELATONE_QUERY_PROPOSALS_BY_WALLET_ADDRESS_PAGINATION",
  PROPOSALS_BY_WALLET_ADDRESS_COUNT = "CELATONE_QUERY_PROPOSALS_BY_WALLET_ADDRESS_COUNT",
  PROPOSALS = "CELATONE_QUERY_PROPOSALS",
  PROPOSALS_COUNT = "CELATONE_QUERY_PROPOSALS_COUNT",
  PROPOSAL_TYPES = "CELATONE_QUERY_PROPOSAL_TYPES",
  GOV_PARAMS = "CELATONE_QUERY_GOV_PARAMS",
  UPLOAD_ACCESS_PARAMS = "CELATONE_QUERY_UPLOAD_ACCESS_PARAMS",
  // PUBLIC PROJECT
  PUBLIC_PROJECTS = "CELATONE_QUERY_PUBLIC_PROJECTS",
  PUBLIC_PROJECT_BY_SLUG = "CELATONE_QUERY_PUBLIC_PROJECT_BY_SLUG",
  PUBLIC_PROJECT_BY_CONTRACT_ADDRESS = "CELATONE_QUERY_PUBLIC_PROJECT_BY_CONTRACT_ADDRESS",
  PUBLIC_PROJECT_BY_CODE_ID = "CELATONE_QUERY_PUBLIC_PROJECT_BY_CODE_ID",
  PUBLIC_PROJECT_BY_WALLET_ADDRESS = "CELATONE_QUERY_PUBLIC_PROJECT_BY_WALLET_ADDRESS",
  PUBLIC_PROJECT_BY_MODULE_PATH = "CELATONE_QUERY_PUBLIC_PROJECT_BY_MODULE_PATH",
  // TX
  TX_DATA = "CELATONE_QUERY_TX_DATA",
  TXS_BY_ADDRESS_PAGINATION = "CELATONE_QUERY_TXS_BY_ADDRESS_PAGINATION",
  TXS_BY_ADDRESS_COUNT = "CELATONE_QUERY_TXS_BY_ADDRESS_COUNT",
  TXS = "CELATONE_QUERY_TXS",
  TXS_COUNT = "CELATONE_QUERY_TXS_COUNT",
  TXS_BY_BLOCK_HEIGHT_PAGINATION = "CELATONE_QUERY_TXS_BY_BLOCK_HEIGHT",
  TXS_BY_BLOCK_HEIGHT_COUNT = "CELATONE_QUERY_TXS_BY_BLOCK_HEIGHT_COUNT",
  // ICNS
  ICNS_NAMES_BY_ADDRESS = "CELATONE_QUERY_ICNS_NAMES_BY_ADDRESS",
  ADDRESS_BY_ICNS_NAME = "CELATONE_QUERY_ADDRESS_BY_ICNS_NAME",
  // POOL
  POOL_LIST = "CELATONE_QUERY_POOL_LIST",
  POOL_LIST_COUNT = "CELATONE_QUERY_POOL_LIST_COUNT",
  POOL_INFO_BY_ID = "CELATONE_QUERY_POOL_INFO_BY_ID",
  POOL_INFO_BY_IDS = "CELATONE_QUERY_POOL_INFO_BY_IDS",
  POOL_TRANSACTION_BY_ID = "CELATONE_QUERY_POOL_TRANSACTION_BY_ID",
  POOL_TRANSACTION_BY_ID_COUNT = "CELATONE_QUERY_POOL_TRANSACTION_BY_ID_COUNT",
  // MOVE
  MOVE_POOL_INFOS = "CELATONE_QUERY_MOVE_POOL_INFOS",
  // MODULES
  ACCOUNT_MODULES = "CELATONE_QUERY_ACCOUNT_MODULES",
  MODULE_VERIFICATION = "CELATONE_QUERY_MODULE_VERIFICATION",
  FUNCTION_VIEW = "CELATONE_QUERY_FUNCTION_VIEW",
  MODULE_DECODE = "CELATONE_QUERY_MODULE_DECODE",
  MODULE_ID = "CELATONE_QUERY_MODULE_ID",
  MODULE_TXS = "CELATONE_QUERY_MODULE_TXS",
  MODULE_TXS_COUNT = "CELATONE_QUERY_MODULE_TXS_COUNT",
  MODULE_HISTORIES = "CELATONE_QUERY_MODULE_HISTORIES",
  MODULE_HISTORIES_COUNT = "CELATONE_QUERY_MODULE_HISTORIES_COUNT",
  MODULE_DETAILS = "CELATONE_QUERY_MODULE_DETAILS",
  SCRIPT_DECODE = "CELATONE_QUERY_SCRIPT_DECODE",
  // RESOURCE
  ACCOUNT_RESOURCES = "CELATONE_QUERY_ACCOUNT_RESOURCES",
}
