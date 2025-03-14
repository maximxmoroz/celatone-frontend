/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\n  query getAccountIdByAddressQueryDocument($address: String!) {\n    accounts_by_pk(address: $address) {\n      id\n    }\n  }\n":
    types.GetAccountIdByAddressQueryDocumentDocument,
  "\n  query getAccountTypeByAddressQueryDocument($address: String!) {\n    accounts_by_pk(address: $address) {\n      type\n    }\n  }\n":
    types.GetAccountTypeByAddressQueryDocumentDocument,
  "\n  query getBlockTimestampByHeightQuery($height: Int!) {\n    blocks_by_pk(height: $height) {\n      timestamp\n    }\n  }\n":
    types.GetBlockTimestampByHeightQueryDocument,
  "\n  query getBlockListQuery($limit: Int!, $offset: Int!) {\n    blocks(limit: $limit, offset: $offset, order_by: { height: desc }) {\n      hash\n      height\n      timestamp\n      transactions_aggregate {\n        aggregate {\n          count\n        }\n      }\n      validator {\n        moniker\n        operator_address\n        identity\n      }\n    }\n  }\n":
    types.GetBlockListQueryDocument,
  "\n  query getBlockDetailsByHeight($height: Int!) {\n    blocks_by_pk(height: $height) {\n      hash\n      height\n      timestamp\n      transactions_aggregate {\n        aggregate {\n          sum {\n            gas_used\n            gas_limit\n          }\n        }\n      }\n      validator {\n        moniker\n        operator_address\n        identity\n      }\n    }\n  }\n":
    types.GetBlockDetailsByHeightDocument,
  "\n  query getLatestBlockInfo {\n    blocks(limit: 1, order_by: { height: desc }) {\n      height\n      timestamp\n    }\n  }\n":
    types.GetLatestBlockInfoDocument,
  "\n  query getBlockTime {\n    hundred: blocks(order_by: { height: desc }, offset: 100, limit: 1) {\n      height\n      timestamp\n    }\n    latest: blocks(order_by: { height: desc }, limit: 1) {\n      height\n      timestamp\n    }\n  }\n":
    types.GetBlockTimeDocument,
  "\n  query getCodeListQuery {\n    codes(limit: 100, offset: 0, order_by: { id: desc }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n":
    types.GetCodeListQueryDocument,
  "\n  query getCodeListByUserQuery($walletAddr: String!) {\n    codes(\n      where: { account: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n":
    types.GetCodeListByUserQueryDocument,
  "\n  query getCodeListByIDsQuery($ids: [Int!]!) {\n    codes(where: { id: { _in: $ids } }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n":
    types.GetCodeListByIDsQueryDocument,
  "\n  query getCodeDataByCodeId($codeId: Int!) {\n    codes_by_pk(id: $codeId) {\n      id\n      account {\n        address\n      }\n      transaction {\n        hash\n        block {\n          height\n          timestamp\n        }\n      }\n      # Can only have 1 store code proposal\n      code_proposals(limit: 1) {\n        proposal_id\n        block {\n          height\n          timestamp\n        }\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n":
    types.GetCodeDataByCodeIdDocument,
  "\n  query getCodeListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    codes(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n":
    types.GetCodeListByWalletAddressPaginationDocument,
  "\n  query getCodeListCountByWalletAddress($walletAddress: String!) {\n    codes_aggregate(where: { account: { address: { _eq: $walletAddress } } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetCodeListCountByWalletAddressDocument,
  "\n  query getContractByContractAddressQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      address\n      code_id\n      label\n      accountByInitBy {\n        address\n      }\n      admin: account {\n        address\n      }\n    }\n  }\n":
    types.GetContractByContractAddressQueryDocumentDocument,
  '\n  query getInstantiateDetailByContractQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      init_msg\n      transaction {\n        hash\n      }\n      contract_proposals(\n        where: {\n          proposal: {\n            type: {\n              _in: [\n                "InstantiateContract"\n                "InstantiateContract2"\n                "SoftwareUpgrade"\n              ]\n            }\n          }\n        }\n        order_by: { proposal: { id: asc } }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: asc } }, limit: 1) {\n        block {\n          height\n          timestamp\n        }\n      }\n    }\n  }\n':
    types.GetInstantiateDetailByContractQueryDocumentDocument,
  "\n  query getContractListQuery {\n    contracts(limit: 100, offset: 0, order_by: { id: desc }) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n      }\n    }\n  }\n":
    types.GetContractListQueryDocument,
  "\n  query getInstantiatedListByUserQueryDocument($walletAddr: String!) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      label\n      address\n      accountByInitBy {\n        address\n      }\n    }\n  }\n":
    types.GetInstantiatedListByUserQueryDocumentDocument,
  "\n  query getInstantiatedCountByUserQueryDocument($walletAddr: String!) {\n    contracts_aggregate(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetInstantiatedCountByUserQueryDocumentDocument,
  "\n  query getAdminByContractAddressesQueryDocument(\n    $contractAddresses: [String!]!\n  ) {\n    contracts(where: { address: { _in: $contractAddresses } }) {\n      address\n      admin: account {\n        address\n      }\n    }\n  }\n":
    types.GetAdminByContractAddressesQueryDocumentDocument,
  "\n  query getContractListByAdmin($address: String!) {\n    contracts(\n      where: { account: { address: { _eq: $address } } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      accountByInitBy {\n        address\n      }\n    }\n  }\n":
    types.GetContractListByAdminDocument,
  "\n  query getContractListByCodeIdPagination(\n    $codeId: Int!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { code_id: { _eq: $codeId } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n":
    types.GetContractListByCodeIdPaginationDocument,
  "\n  query getContractListCountByCodeId($codeId: Int!) {\n    contracts_aggregate(where: { code_id: { _eq: $codeId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetContractListCountByCodeIdDocument,
  "\n  query getMigrationHistoriesByContractAddress(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_histories(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { block: { timestamp: desc } }\n      limit: $pageSize\n      offset: $offset\n    ) {\n      code_id\n      account {\n        address\n      }\n      block {\n        height\n        timestamp\n      }\n      remark\n      code {\n        account {\n          address\n        }\n        cw2_contract\n        cw2_version\n      }\n    }\n  }\n":
    types.GetMigrationHistoriesByContractAddressDocument,
  "\n  query getMigrationHistoriesCountByContractAddress($contractAddress: String!) {\n    contract_histories_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetMigrationHistoriesCountByContractAddressDocument,
  "\n  query getContractListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: {\n        contract_histories_aggregate: { max: { block_height: desc } }\n      }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n":
    types.GetContractListByWalletAddressPaginationDocument,
  "\n  query getContractListByAdminPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n":
    types.GetContractListByAdminPaginationDocument,
  "\n  query getContractListCountByAdmin($walletAddress: String!) {\n    contracts_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetContractListCountByAdminDocument,
  "\n  query getModuleIdByNameAndVmAddressQuery(\n    $name: String!\n    $vmAddress: String!\n  ) {\n    modules(\n      where: {\n        name: { _eq: $name }\n        vm_address: { vm_address: { _eq: $vmAddress } }\n      }\n    ) {\n      id\n    }\n  }\n":
    types.GetModuleIdByNameAndVmAddressQueryDocument,
  "\n  query getModuleHistoriesQuery(\n    $moduleId: Int!\n    $pageSize: Int!\n    $offset: Int!\n  ) {\n    module_histories(\n      where: { module_id: { _eq: $moduleId } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { block: { height: desc } }\n    ) {\n      remark\n      block {\n        height\n        timestamp\n      }\n      upgrade_policy\n    }\n  }\n":
    types.GetModuleHistoriesQueryDocument,
  "\n  query getModuleHistoriesCountQuery($moduleId: Int!) {\n    module_histories_aggregate(where: { module_id: { _eq: $moduleId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetModuleHistoriesCountQueryDocument,
  '\n  query getModuleInitialPublishInfoQuery($moduleId: Int!) {\n    modules(where: { id: { _eq: $moduleId } }) {\n      publisher_vm_address: vm_address {\n        vm_address\n      }\n      publish_transaction: transaction {\n        hash\n      }\n      module_proposals(\n        where: {\n          proposal: { type: { _in: ["/initia.move.v1.MsgGovPublish"] } }\n        }\n        order_by: { proposal_id: asc }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n      module_histories(order_by: { block: { timestamp: asc } }, limit: 1) {\n        block {\n          height\n          timestamp\n        }\n      }\n    }\n  }\n':
    types.GetModuleInitialPublishInfoQueryDocument,
  "\n  query getPoolList(\n    $expression: pools_bool_exp\n    $order: order_by\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pools(\n      where: $expression\n      order_by: { id: $order }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      id\n      type\n      is_superfluid\n      liquidity\n      contract_address\n    }\n  }\n":
    types.GetPoolListDocument,
  "\n  query getPoolListCount($expression: pools_bool_exp) {\n    pools_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetPoolListCountDocument,
  "\n  query getPoolListByDenoms(\n    $denoms: _varchar\n    $expression: pools_bool_exp\n    $order: order_by\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pools: search_pools_with_denoms(\n      args: { denoms: $denoms }\n      where: $expression\n      order_by: { id: $order }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      id\n      type\n      is_superfluid\n      liquidity\n      contract_address\n    }\n  }\n":
    types.GetPoolListByDenomsDocument,
  "\n  query getPoolListByDenomsCount(\n    $denoms: _varchar\n    $expression: pools_bool_exp\n  ) {\n    pools_aggregate: search_pools_with_denoms_aggregate(\n      args: { denoms: $denoms }\n      where: $expression\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetPoolListByDenomsCountDocument,
  "\n  query getPoolByPoolId($poolId: Int!) {\n    pools_by_pk(id: $poolId) {\n      id\n      type\n      is_superfluid\n      is_supported\n      liquidity\n      transaction {\n        block_height\n      }\n      account {\n        address\n      }\n      address\n      swap_fee\n      exit_fee\n      future_pool_governor\n      weight\n      smooth_weight_change_params\n      scaling_factors\n      scaling_factor_controller\n      spread_factor\n      tick_spacing\n      contract_address\n    }\n  }\n":
    types.GetPoolByPoolIdDocument,
  "\n  query getPoolsByPoolIds($poolIds: [Int!]!) {\n    pools(where: { id: { _in: $poolIds } }) {\n      id\n      liquidity\n    }\n  }\n":
    types.GetPoolsByPoolIdsDocument,
  "\n  query getRelatedProposalsByContractAddressPagination(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_proposals(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { proposal_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      proposal {\n        title\n        status\n        voting_end_time\n        deposit_end_time\n        type\n        account {\n          address\n        }\n        is_expedited\n      }\n      proposal_id\n      resolved_height\n    }\n  }\n":
    types.GetRelatedProposalsByContractAddressPaginationDocument,
  "\n  query getRelatedProposalsCountByContractAddress($contractAddress: String!) {\n    contract_proposals_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetRelatedProposalsCountByContractAddressDocument,
  "\n  query getProposalsByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: { account: { address: { _eq: $walletAddress } } }\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      title\n      status\n      voting_end_time\n      deposit_end_time\n      type\n      id\n      is_expedited\n      resolved_height\n    }\n  }\n":
    types.GetProposalsByWalletAddressPaginationDocument,
  "\n  query getProposalsCountByWalletAddress($walletAddress: String!) {\n    proposals_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetProposalsCountByWalletAddressDocument,
  "\n  query getProposalList(\n    $expression: proposals_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: $expression\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      type\n      id\n      title\n      voting_end_time\n      deposit_end_time\n      resolved_height\n      status\n      is_expedited\n      account {\n        address\n      }\n    }\n  }\n":
    types.GetProposalListDocument,
  "\n  query getProposalListCount($expression: proposals_bool_exp) {\n    proposals_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetProposalListCountDocument,
  "\n  query getProposalTypes {\n    proposals(distinct_on: type) {\n      type\n    }\n  }\n":
    types.GetProposalTypesDocument,
  "\n  query getTxsByAddressPagination(\n    $expression: account_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    account_transactions(\n      where: $expression\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_send\n        is_ibc\n        is_clear_admin @include(if: $isWasm)\n        is_execute @include(if: $isWasm)\n        is_instantiate @include(if: $isWasm)\n        is_migrate @include(if: $isWasm)\n        is_store_code @include(if: $isWasm)\n        is_update_admin @include(if: $isWasm)\n        is_move_publish @include(if: $isMove)\n        is_move_upgrade @include(if: $isMove)\n        is_move_execute @include(if: $isMove)\n        is_move_script @include(if: $isMove)\n      }\n      is_signer\n    }\n  }\n":
    types.GetTxsByAddressPaginationDocument,
  "\n  query getTxsCountByAddress($expression: account_transactions_bool_exp) {\n    account_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetTxsCountByAddressDocument,
  "\n  query getTxsByPoolIdPagination(\n    $expression: pool_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pool_transactions(\n      where: $expression\n      order_by: { block_height: desc, transaction_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_ibc\n      }\n    }\n  }\n":
    types.GetTxsByPoolIdPaginationDocument,
  "\n  query getTxsCountByPoolId($expression: pool_transactions_bool_exp) {\n    pool_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetTxsCountByPoolIdDocument,
  "\n  query getTxs(\n    $offset: Int!\n    $pageSize: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    transactions(\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_send\n      is_ibc\n      is_clear_admin @include(if: $isWasm)\n      is_execute @include(if: $isWasm)\n      is_instantiate @include(if: $isWasm)\n      is_migrate @include(if: $isWasm)\n      is_store_code @include(if: $isWasm)\n      is_update_admin @include(if: $isWasm)\n      is_move_publish @include(if: $isMove)\n      is_move_upgrade @include(if: $isMove)\n      is_move_execute @include(if: $isMove)\n      is_move_script @include(if: $isMove)\n    }\n  }\n":
    types.GetTxsDocument,
  "\n  query getTxsCount {\n    transactions(limit: 1, order_by: { id: desc }) {\n      id\n    }\n  }\n":
    types.GetTxsCountDocument,
  "\n  query getBlockTransactionsByHeightQuery(\n    $limit: Int!\n    $offset: Int!\n    $height: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    transactions(\n      limit: $limit\n      offset: $offset\n      where: { block_height: { _eq: $height } }\n      order_by: { id: asc }\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_send\n      is_ibc\n      is_clear_admin @include(if: $isWasm)\n      is_execute @include(if: $isWasm)\n      is_instantiate @include(if: $isWasm)\n      is_migrate @include(if: $isWasm)\n      is_store_code @include(if: $isWasm)\n      is_update_admin @include(if: $isWasm)\n      is_move_publish @include(if: $isMove)\n      is_move_upgrade @include(if: $isMove)\n      is_move_execute @include(if: $isMove)\n      is_move_script @include(if: $isMove)\n    }\n  }\n":
    types.GetBlockTransactionsByHeightQueryDocument,
  "\n  query getBlockTransactionCountByHeightQuery($height: Int!) {\n    transactions_aggregate(where: { block_height: { _eq: $height } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetBlockTransactionCountByHeightQueryDocument,
  "\n  query getModuleTransactionsQuery(\n    $moduleId: Int!\n    $pageSize: Int!\n    $offset: Int!\n  ) {\n    module_transactions(\n      where: { module_id: { _eq: $moduleId } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { block_height: desc }\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_send\n        is_ibc\n        is_move_execute\n        is_move_execute_event\n        is_move_publish\n        is_move_script\n        is_move_upgrade\n      }\n    }\n  }\n":
    types.GetModuleTransactionsQueryDocument,
  "\n  query getModuleTransactionsCountQuery($moduleId: Int!) {\n    module_transactions_aggregate(where: { module_id: { _eq: $moduleId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetModuleTransactionsCountQueryDocument,
  "\n  query getValidators {\n    validators {\n      commission_max_change\n      commission_max_rate\n      commission_rate\n      consensus_address\n      details\n      identity\n      jailed\n      moniker\n      operator_address\n      website\n    }\n  }\n":
    types.GetValidatorsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getAccountIdByAddressQueryDocument($address: String!) {\n    accounts_by_pk(address: $address) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  query getAccountIdByAddressQueryDocument($address: String!) {\n    accounts_by_pk(address: $address) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getAccountTypeByAddressQueryDocument($address: String!) {\n    accounts_by_pk(address: $address) {\n      type\n    }\n  }\n"
): (typeof documents)["\n  query getAccountTypeByAddressQueryDocument($address: String!) {\n    accounts_by_pk(address: $address) {\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBlockTimestampByHeightQuery($height: Int!) {\n    blocks_by_pk(height: $height) {\n      timestamp\n    }\n  }\n"
): (typeof documents)["\n  query getBlockTimestampByHeightQuery($height: Int!) {\n    blocks_by_pk(height: $height) {\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBlockListQuery($limit: Int!, $offset: Int!) {\n    blocks(limit: $limit, offset: $offset, order_by: { height: desc }) {\n      hash\n      height\n      timestamp\n      transactions_aggregate {\n        aggregate {\n          count\n        }\n      }\n      validator {\n        moniker\n        operator_address\n        identity\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getBlockListQuery($limit: Int!, $offset: Int!) {\n    blocks(limit: $limit, offset: $offset, order_by: { height: desc }) {\n      hash\n      height\n      timestamp\n      transactions_aggregate {\n        aggregate {\n          count\n        }\n      }\n      validator {\n        moniker\n        operator_address\n        identity\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBlockDetailsByHeight($height: Int!) {\n    blocks_by_pk(height: $height) {\n      hash\n      height\n      timestamp\n      transactions_aggregate {\n        aggregate {\n          sum {\n            gas_used\n            gas_limit\n          }\n        }\n      }\n      validator {\n        moniker\n        operator_address\n        identity\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getBlockDetailsByHeight($height: Int!) {\n    blocks_by_pk(height: $height) {\n      hash\n      height\n      timestamp\n      transactions_aggregate {\n        aggregate {\n          sum {\n            gas_used\n            gas_limit\n          }\n        }\n      }\n      validator {\n        moniker\n        operator_address\n        identity\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getLatestBlockInfo {\n    blocks(limit: 1, order_by: { height: desc }) {\n      height\n      timestamp\n    }\n  }\n"
): (typeof documents)["\n  query getLatestBlockInfo {\n    blocks(limit: 1, order_by: { height: desc }) {\n      height\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBlockTime {\n    hundred: blocks(order_by: { height: desc }, offset: 100, limit: 1) {\n      height\n      timestamp\n    }\n    latest: blocks(order_by: { height: desc }, limit: 1) {\n      height\n      timestamp\n    }\n  }\n"
): (typeof documents)["\n  query getBlockTime {\n    hundred: blocks(order_by: { height: desc }, offset: 100, limit: 1) {\n      height\n      timestamp\n    }\n    latest: blocks(order_by: { height: desc }, limit: 1) {\n      height\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCodeListQuery {\n    codes(limit: 100, offset: 0, order_by: { id: desc }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): (typeof documents)["\n  query getCodeListQuery {\n    codes(limit: 100, offset: 0, order_by: { id: desc }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCodeListByUserQuery($walletAddr: String!) {\n    codes(\n      where: { account: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): (typeof documents)["\n  query getCodeListByUserQuery($walletAddr: String!) {\n    codes(\n      where: { account: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCodeListByIDsQuery($ids: [Int!]!) {\n    codes(where: { id: { _in: $ids } }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): (typeof documents)["\n  query getCodeListByIDsQuery($ids: [Int!]!) {\n    codes(where: { id: { _in: $ids } }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCodeDataByCodeId($codeId: Int!) {\n    codes_by_pk(id: $codeId) {\n      id\n      account {\n        address\n      }\n      transaction {\n        hash\n        block {\n          height\n          timestamp\n        }\n      }\n      # Can only have 1 store code proposal\n      code_proposals(limit: 1) {\n        proposal_id\n        block {\n          height\n          timestamp\n        }\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): (typeof documents)["\n  query getCodeDataByCodeId($codeId: Int!) {\n    codes_by_pk(id: $codeId) {\n      id\n      account {\n        address\n      }\n      transaction {\n        hash\n        block {\n          height\n          timestamp\n        }\n      }\n      # Can only have 1 store code proposal\n      code_proposals(limit: 1) {\n        proposal_id\n        block {\n          height\n          timestamp\n        }\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCodeListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    codes(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): (typeof documents)["\n  query getCodeListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    codes(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCodeListCountByWalletAddress($walletAddress: String!) {\n    codes_aggregate(where: { account: { address: { _eq: $walletAddress } } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getCodeListCountByWalletAddress($walletAddress: String!) {\n    codes_aggregate(where: { account: { address: { _eq: $walletAddress } } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractByContractAddressQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      address\n      code_id\n      label\n      accountByInitBy {\n        address\n      }\n      admin: account {\n        address\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractByContractAddressQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      address\n      code_id\n      label\n      accountByInitBy {\n        address\n      }\n      admin: account {\n        address\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getInstantiateDetailByContractQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      init_msg\n      transaction {\n        hash\n      }\n      contract_proposals(\n        where: {\n          proposal: {\n            type: {\n              _in: [\n                "InstantiateContract"\n                "InstantiateContract2"\n                "SoftwareUpgrade"\n              ]\n            }\n          }\n        }\n        order_by: { proposal: { id: asc } }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: asc } }, limit: 1) {\n        block {\n          height\n          timestamp\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getInstantiateDetailByContractQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      init_msg\n      transaction {\n        hash\n      }\n      contract_proposals(\n        where: {\n          proposal: {\n            type: {\n              _in: [\n                "InstantiateContract"\n                "InstantiateContract2"\n                "SoftwareUpgrade"\n              ]\n            }\n          }\n        }\n        order_by: { proposal: { id: asc } }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: asc } }, limit: 1) {\n        block {\n          height\n          timestamp\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListQuery {\n    contracts(limit: 100, offset: 0, order_by: { id: desc }) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListQuery {\n    contracts(limit: 100, offset: 0, order_by: { id: desc }) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getInstantiatedListByUserQueryDocument($walletAddr: String!) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      label\n      address\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getInstantiatedListByUserQueryDocument($walletAddr: String!) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      label\n      address\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getInstantiatedCountByUserQueryDocument($walletAddr: String!) {\n    contracts_aggregate(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getInstantiatedCountByUserQueryDocument($walletAddr: String!) {\n    contracts_aggregate(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getAdminByContractAddressesQueryDocument(\n    $contractAddresses: [String!]!\n  ) {\n    contracts(where: { address: { _in: $contractAddresses } }) {\n      address\n      admin: account {\n        address\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getAdminByContractAddressesQueryDocument(\n    $contractAddresses: [String!]!\n  ) {\n    contracts(where: { address: { _in: $contractAddresses } }) {\n      address\n      admin: account {\n        address\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListByAdmin($address: String!) {\n    contracts(\n      where: { account: { address: { _eq: $address } } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListByAdmin($address: String!) {\n    contracts(\n      where: { account: { address: { _eq: $address } } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListByCodeIdPagination(\n    $codeId: Int!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { code_id: { _eq: $codeId } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListByCodeIdPagination(\n    $codeId: Int!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { code_id: { _eq: $codeId } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListCountByCodeId($codeId: Int!) {\n    contracts_aggregate(where: { code_id: { _eq: $codeId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListCountByCodeId($codeId: Int!) {\n    contracts_aggregate(where: { code_id: { _eq: $codeId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getMigrationHistoriesByContractAddress(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_histories(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { block: { timestamp: desc } }\n      limit: $pageSize\n      offset: $offset\n    ) {\n      code_id\n      account {\n        address\n      }\n      block {\n        height\n        timestamp\n      }\n      remark\n      code {\n        account {\n          address\n        }\n        cw2_contract\n        cw2_version\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getMigrationHistoriesByContractAddress(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_histories(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { block: { timestamp: desc } }\n      limit: $pageSize\n      offset: $offset\n    ) {\n      code_id\n      account {\n        address\n      }\n      block {\n        height\n        timestamp\n      }\n      remark\n      code {\n        account {\n          address\n        }\n        cw2_contract\n        cw2_version\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getMigrationHistoriesCountByContractAddress($contractAddress: String!) {\n    contract_histories_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getMigrationHistoriesCountByContractAddress($contractAddress: String!) {\n    contract_histories_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: {\n        contract_histories_aggregate: { max: { block_height: desc } }\n      }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: {\n        contract_histories_aggregate: { max: { block_height: desc } }\n      }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListByAdminPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListByAdminPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getContractListCountByAdmin($walletAddress: String!) {\n    contracts_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getContractListCountByAdmin($walletAddress: String!) {\n    contracts_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getModuleIdByNameAndVmAddressQuery(\n    $name: String!\n    $vmAddress: String!\n  ) {\n    modules(\n      where: {\n        name: { _eq: $name }\n        vm_address: { vm_address: { _eq: $vmAddress } }\n      }\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  query getModuleIdByNameAndVmAddressQuery(\n    $name: String!\n    $vmAddress: String!\n  ) {\n    modules(\n      where: {\n        name: { _eq: $name }\n        vm_address: { vm_address: { _eq: $vmAddress } }\n      }\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getModuleHistoriesQuery(\n    $moduleId: Int!\n    $pageSize: Int!\n    $offset: Int!\n  ) {\n    module_histories(\n      where: { module_id: { _eq: $moduleId } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { block: { height: desc } }\n    ) {\n      remark\n      block {\n        height\n        timestamp\n      }\n      upgrade_policy\n    }\n  }\n"
): (typeof documents)["\n  query getModuleHistoriesQuery(\n    $moduleId: Int!\n    $pageSize: Int!\n    $offset: Int!\n  ) {\n    module_histories(\n      where: { module_id: { _eq: $moduleId } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { block: { height: desc } }\n    ) {\n      remark\n      block {\n        height\n        timestamp\n      }\n      upgrade_policy\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getModuleHistoriesCountQuery($moduleId: Int!) {\n    module_histories_aggregate(where: { module_id: { _eq: $moduleId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getModuleHistoriesCountQuery($moduleId: Int!) {\n    module_histories_aggregate(where: { module_id: { _eq: $moduleId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getModuleInitialPublishInfoQuery($moduleId: Int!) {\n    modules(where: { id: { _eq: $moduleId } }) {\n      publisher_vm_address: vm_address {\n        vm_address\n      }\n      publish_transaction: transaction {\n        hash\n      }\n      module_proposals(\n        where: {\n          proposal: { type: { _in: ["/initia.move.v1.MsgGovPublish"] } }\n        }\n        order_by: { proposal_id: asc }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n      module_histories(order_by: { block: { timestamp: asc } }, limit: 1) {\n        block {\n          height\n          timestamp\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getModuleInitialPublishInfoQuery($moduleId: Int!) {\n    modules(where: { id: { _eq: $moduleId } }) {\n      publisher_vm_address: vm_address {\n        vm_address\n      }\n      publish_transaction: transaction {\n        hash\n      }\n      module_proposals(\n        where: {\n          proposal: { type: { _in: ["/initia.move.v1.MsgGovPublish"] } }\n        }\n        order_by: { proposal_id: asc }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n      module_histories(order_by: { block: { timestamp: asc } }, limit: 1) {\n        block {\n          height\n          timestamp\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPoolList(\n    $expression: pools_bool_exp\n    $order: order_by\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pools(\n      where: $expression\n      order_by: { id: $order }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      id\n      type\n      is_superfluid\n      liquidity\n      contract_address\n    }\n  }\n"
): (typeof documents)["\n  query getPoolList(\n    $expression: pools_bool_exp\n    $order: order_by\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pools(\n      where: $expression\n      order_by: { id: $order }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      id\n      type\n      is_superfluid\n      liquidity\n      contract_address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPoolListCount($expression: pools_bool_exp) {\n    pools_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getPoolListCount($expression: pools_bool_exp) {\n    pools_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPoolListByDenoms(\n    $denoms: _varchar\n    $expression: pools_bool_exp\n    $order: order_by\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pools: search_pools_with_denoms(\n      args: { denoms: $denoms }\n      where: $expression\n      order_by: { id: $order }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      id\n      type\n      is_superfluid\n      liquidity\n      contract_address\n    }\n  }\n"
): (typeof documents)["\n  query getPoolListByDenoms(\n    $denoms: _varchar\n    $expression: pools_bool_exp\n    $order: order_by\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pools: search_pools_with_denoms(\n      args: { denoms: $denoms }\n      where: $expression\n      order_by: { id: $order }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      id\n      type\n      is_superfluid\n      liquidity\n      contract_address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPoolListByDenomsCount(\n    $denoms: _varchar\n    $expression: pools_bool_exp\n  ) {\n    pools_aggregate: search_pools_with_denoms_aggregate(\n      args: { denoms: $denoms }\n      where: $expression\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getPoolListByDenomsCount(\n    $denoms: _varchar\n    $expression: pools_bool_exp\n  ) {\n    pools_aggregate: search_pools_with_denoms_aggregate(\n      args: { denoms: $denoms }\n      where: $expression\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPoolByPoolId($poolId: Int!) {\n    pools_by_pk(id: $poolId) {\n      id\n      type\n      is_superfluid\n      is_supported\n      liquidity\n      transaction {\n        block_height\n      }\n      account {\n        address\n      }\n      address\n      swap_fee\n      exit_fee\n      future_pool_governor\n      weight\n      smooth_weight_change_params\n      scaling_factors\n      scaling_factor_controller\n      spread_factor\n      tick_spacing\n      contract_address\n    }\n  }\n"
): (typeof documents)["\n  query getPoolByPoolId($poolId: Int!) {\n    pools_by_pk(id: $poolId) {\n      id\n      type\n      is_superfluid\n      is_supported\n      liquidity\n      transaction {\n        block_height\n      }\n      account {\n        address\n      }\n      address\n      swap_fee\n      exit_fee\n      future_pool_governor\n      weight\n      smooth_weight_change_params\n      scaling_factors\n      scaling_factor_controller\n      spread_factor\n      tick_spacing\n      contract_address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPoolsByPoolIds($poolIds: [Int!]!) {\n    pools(where: { id: { _in: $poolIds } }) {\n      id\n      liquidity\n    }\n  }\n"
): (typeof documents)["\n  query getPoolsByPoolIds($poolIds: [Int!]!) {\n    pools(where: { id: { _in: $poolIds } }) {\n      id\n      liquidity\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getRelatedProposalsByContractAddressPagination(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_proposals(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { proposal_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      proposal {\n        title\n        status\n        voting_end_time\n        deposit_end_time\n        type\n        account {\n          address\n        }\n        is_expedited\n      }\n      proposal_id\n      resolved_height\n    }\n  }\n"
): (typeof documents)["\n  query getRelatedProposalsByContractAddressPagination(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_proposals(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { proposal_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      proposal {\n        title\n        status\n        voting_end_time\n        deposit_end_time\n        type\n        account {\n          address\n        }\n        is_expedited\n      }\n      proposal_id\n      resolved_height\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getRelatedProposalsCountByContractAddress($contractAddress: String!) {\n    contract_proposals_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getRelatedProposalsCountByContractAddress($contractAddress: String!) {\n    contract_proposals_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getProposalsByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: { account: { address: { _eq: $walletAddress } } }\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      title\n      status\n      voting_end_time\n      deposit_end_time\n      type\n      id\n      is_expedited\n      resolved_height\n    }\n  }\n"
): (typeof documents)["\n  query getProposalsByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: { account: { address: { _eq: $walletAddress } } }\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      title\n      status\n      voting_end_time\n      deposit_end_time\n      type\n      id\n      is_expedited\n      resolved_height\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getProposalsCountByWalletAddress($walletAddress: String!) {\n    proposals_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getProposalsCountByWalletAddress($walletAddress: String!) {\n    proposals_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getProposalList(\n    $expression: proposals_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: $expression\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      type\n      id\n      title\n      voting_end_time\n      deposit_end_time\n      resolved_height\n      status\n      is_expedited\n      account {\n        address\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getProposalList(\n    $expression: proposals_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: $expression\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      type\n      id\n      title\n      voting_end_time\n      deposit_end_time\n      resolved_height\n      status\n      is_expedited\n      account {\n        address\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getProposalListCount($expression: proposals_bool_exp) {\n    proposals_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getProposalListCount($expression: proposals_bool_exp) {\n    proposals_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getProposalTypes {\n    proposals(distinct_on: type) {\n      type\n    }\n  }\n"
): (typeof documents)["\n  query getProposalTypes {\n    proposals(distinct_on: type) {\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getTxsByAddressPagination(\n    $expression: account_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    account_transactions(\n      where: $expression\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_send\n        is_ibc\n        is_clear_admin @include(if: $isWasm)\n        is_execute @include(if: $isWasm)\n        is_instantiate @include(if: $isWasm)\n        is_migrate @include(if: $isWasm)\n        is_store_code @include(if: $isWasm)\n        is_update_admin @include(if: $isWasm)\n        is_move_publish @include(if: $isMove)\n        is_move_upgrade @include(if: $isMove)\n        is_move_execute @include(if: $isMove)\n        is_move_script @include(if: $isMove)\n      }\n      is_signer\n    }\n  }\n"
): (typeof documents)["\n  query getTxsByAddressPagination(\n    $expression: account_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    account_transactions(\n      where: $expression\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_send\n        is_ibc\n        is_clear_admin @include(if: $isWasm)\n        is_execute @include(if: $isWasm)\n        is_instantiate @include(if: $isWasm)\n        is_migrate @include(if: $isWasm)\n        is_store_code @include(if: $isWasm)\n        is_update_admin @include(if: $isWasm)\n        is_move_publish @include(if: $isMove)\n        is_move_upgrade @include(if: $isMove)\n        is_move_execute @include(if: $isMove)\n        is_move_script @include(if: $isMove)\n      }\n      is_signer\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getTxsCountByAddress($expression: account_transactions_bool_exp) {\n    account_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getTxsCountByAddress($expression: account_transactions_bool_exp) {\n    account_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getTxsByPoolIdPagination(\n    $expression: pool_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pool_transactions(\n      where: $expression\n      order_by: { block_height: desc, transaction_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_ibc\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getTxsByPoolIdPagination(\n    $expression: pool_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    pool_transactions(\n      where: $expression\n      order_by: { block_height: desc, transaction_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_ibc\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getTxsCountByPoolId($expression: pool_transactions_bool_exp) {\n    pool_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getTxsCountByPoolId($expression: pool_transactions_bool_exp) {\n    pool_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getTxs(\n    $offset: Int!\n    $pageSize: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    transactions(\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_send\n      is_ibc\n      is_clear_admin @include(if: $isWasm)\n      is_execute @include(if: $isWasm)\n      is_instantiate @include(if: $isWasm)\n      is_migrate @include(if: $isWasm)\n      is_store_code @include(if: $isWasm)\n      is_update_admin @include(if: $isWasm)\n      is_move_publish @include(if: $isMove)\n      is_move_upgrade @include(if: $isMove)\n      is_move_execute @include(if: $isMove)\n      is_move_script @include(if: $isMove)\n    }\n  }\n"
): (typeof documents)["\n  query getTxs(\n    $offset: Int!\n    $pageSize: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    transactions(\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_send\n      is_ibc\n      is_clear_admin @include(if: $isWasm)\n      is_execute @include(if: $isWasm)\n      is_instantiate @include(if: $isWasm)\n      is_migrate @include(if: $isWasm)\n      is_store_code @include(if: $isWasm)\n      is_update_admin @include(if: $isWasm)\n      is_move_publish @include(if: $isMove)\n      is_move_upgrade @include(if: $isMove)\n      is_move_execute @include(if: $isMove)\n      is_move_script @include(if: $isMove)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getTxsCount {\n    transactions(limit: 1, order_by: { id: desc }) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  query getTxsCount {\n    transactions(limit: 1, order_by: { id: desc }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBlockTransactionsByHeightQuery(\n    $limit: Int!\n    $offset: Int!\n    $height: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    transactions(\n      limit: $limit\n      offset: $offset\n      where: { block_height: { _eq: $height } }\n      order_by: { id: asc }\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_send\n      is_ibc\n      is_clear_admin @include(if: $isWasm)\n      is_execute @include(if: $isWasm)\n      is_instantiate @include(if: $isWasm)\n      is_migrate @include(if: $isWasm)\n      is_store_code @include(if: $isWasm)\n      is_update_admin @include(if: $isWasm)\n      is_move_publish @include(if: $isMove)\n      is_move_upgrade @include(if: $isMove)\n      is_move_execute @include(if: $isMove)\n      is_move_script @include(if: $isMove)\n    }\n  }\n"
): (typeof documents)["\n  query getBlockTransactionsByHeightQuery(\n    $limit: Int!\n    $offset: Int!\n    $height: Int!\n    $isWasm: Boolean!\n    $isMove: Boolean!\n  ) {\n    transactions(\n      limit: $limit\n      offset: $offset\n      where: { block_height: { _eq: $height } }\n      order_by: { id: asc }\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_send\n      is_ibc\n      is_clear_admin @include(if: $isWasm)\n      is_execute @include(if: $isWasm)\n      is_instantiate @include(if: $isWasm)\n      is_migrate @include(if: $isWasm)\n      is_store_code @include(if: $isWasm)\n      is_update_admin @include(if: $isWasm)\n      is_move_publish @include(if: $isMove)\n      is_move_upgrade @include(if: $isMove)\n      is_move_execute @include(if: $isMove)\n      is_move_script @include(if: $isMove)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBlockTransactionCountByHeightQuery($height: Int!) {\n    transactions_aggregate(where: { block_height: { _eq: $height } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getBlockTransactionCountByHeightQuery($height: Int!) {\n    transactions_aggregate(where: { block_height: { _eq: $height } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getModuleTransactionsQuery(\n    $moduleId: Int!\n    $pageSize: Int!\n    $offset: Int!\n  ) {\n    module_transactions(\n      where: { module_id: { _eq: $moduleId } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { block_height: desc }\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_send\n        is_ibc\n        is_move_execute\n        is_move_execute_event\n        is_move_publish\n        is_move_script\n        is_move_upgrade\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getModuleTransactionsQuery(\n    $moduleId: Int!\n    $pageSize: Int!\n    $offset: Int!\n  ) {\n    module_transactions(\n      where: { module_id: { _eq: $moduleId } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { block_height: desc }\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_send\n        is_ibc\n        is_move_execute\n        is_move_execute_event\n        is_move_publish\n        is_move_script\n        is_move_upgrade\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getModuleTransactionsCountQuery($moduleId: Int!) {\n    module_transactions_aggregate(where: { module_id: { _eq: $moduleId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getModuleTransactionsCountQuery($moduleId: Int!) {\n    module_transactions_aggregate(where: { module_id: { _eq: $moduleId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getValidators {\n    validators {\n      commission_max_change\n      commission_max_rate\n      commission_rate\n      consensus_address\n      details\n      identity\n      jailed\n      moniker\n      operator_address\n      website\n    }\n  }\n"
): (typeof documents)["\n  query getValidators {\n    validators {\n      commission_max_change\n      commission_max_rate\n      commission_rate\n      consensus_address\n      details\n      identity\n      jailed\n      moniker\n      operator_address\n      website\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
