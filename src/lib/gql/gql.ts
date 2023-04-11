/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query getBlockTimestampByHeightQuery($height: Int!) {\n    blocks_by_pk(height: $height) {\n      timestamp\n    }\n  }\n":
    types.GetBlockTimestampByHeightQueryDocument,
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
  "\n  query getInstantiatedListByUserQueryDocument($walletAddr: String!) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      label\n      address\n      accountByInitBy {\n        address\n      }\n    }\n  }\n":
    types.GetInstantiatedListByUserQueryDocumentDocument,
  "\n  query getInstantiatedCountByUserQueryDocument($walletAddr: String!) {\n    contracts_aggregate(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetInstantiatedCountByUserQueryDocumentDocument,
  '\n  query getInstantiateDetailByContractQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      init_msg\n      transaction {\n        hash\n      }\n      contract_proposals(\n        where: {\n          proposal: {\n            type: {\n              _in: [\n                "InstantiateContract"\n                "InstantiateContract2"\n                "SoftwareUpgrade"\n              ]\n            }\n          }\n        }\n        order_by: { proposal: { id: asc } }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n    }\n  }\n':
    types.GetInstantiateDetailByContractQueryDocumentDocument,
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
  "\n  query getContractListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n":
    types.GetContractListByWalletAddressPaginationDocument,
  "\n  query getContractListByAdminPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n":
    types.GetContractListByAdminPaginationDocument,
  "\n  query getContractListCountByAdmin($walletAddress: String!) {\n    contracts_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetContractListCountByAdminDocument,
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
  "\n  query getTxsByAddressPagination(\n    $expression: account_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    account_transactions(\n      where: $expression\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_clear_admin\n        is_execute\n        is_ibc\n        is_instantiate\n        is_migrate\n        is_send\n        is_store_code\n        is_update_admin\n      }\n      is_signer\n    }\n  }\n":
    types.GetTxsByAddressPaginationDocument,
  "\n  query getTxsCountByAddress($expression: account_transactions_bool_exp) {\n    account_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetTxsCountByAddressDocument,
  "\n  query getTxList($offset: Int!, $pageSize: Int!) {\n    transactions(\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_clear_admin\n      is_execute\n      is_ibc\n      is_instantiate\n      is_migrate\n      is_send\n      is_store_code\n      is_update_admin\n    }\n  }\n":
    types.GetTxListDocument,
  "\n  query getTxListCount {\n    transactions_aggregate {\n      aggregate {\n        count\n      }\n    }\n  }\n":
    types.GetTxListCountDocument,
};

export function graphql(
  source: "\n  query getBlockTimestampByHeightQuery($height: Int!) {\n    blocks_by_pk(height: $height) {\n      timestamp\n    }\n  }\n"
): typeof documents["\n  query getBlockTimestampByHeightQuery($height: Int!) {\n    blocks_by_pk(height: $height) {\n      timestamp\n    }\n  }\n"];
export function graphql(
  source: "\n  query getCodeListQuery {\n    codes(limit: 100, offset: 0, order_by: { id: desc }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): typeof documents["\n  query getCodeListQuery {\n    codes(limit: 100, offset: 0, order_by: { id: desc }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
export function graphql(
  source: "\n  query getCodeListByUserQuery($walletAddr: String!) {\n    codes(\n      where: { account: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): typeof documents["\n  query getCodeListByUserQuery($walletAddr: String!) {\n    codes(\n      where: { account: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
export function graphql(
  source: "\n  query getCodeListByIDsQuery($ids: [Int!]!) {\n    codes(where: { id: { _in: $ids } }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): typeof documents["\n  query getCodeListByIDsQuery($ids: [Int!]!) {\n    codes(where: { id: { _in: $ids } }) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
export function graphql(
  source: "\n  query getCodeDataByCodeId($codeId: Int!) {\n    codes_by_pk(id: $codeId) {\n      id\n      account {\n        address\n      }\n      transaction {\n        hash\n        block {\n          height\n          timestamp\n        }\n      }\n      # Can only have 1 store code proposal\n      code_proposals(limit: 1) {\n        proposal_id\n        block {\n          height\n          timestamp\n        }\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): typeof documents["\n  query getCodeDataByCodeId($codeId: Int!) {\n    codes_by_pk(id: $codeId) {\n      id\n      account {\n        address\n      }\n      transaction {\n        hash\n        block {\n          height\n          timestamp\n        }\n      }\n      # Can only have 1 store code proposal\n      code_proposals(limit: 1) {\n        proposal_id\n        block {\n          height\n          timestamp\n        }\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
export function graphql(
  source: "\n  query getCodeListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    codes(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"
): typeof documents["\n  query getCodeListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    codes(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { id: desc }\n    ) {\n      id\n      contracts_aggregate {\n        aggregate {\n          count\n        }\n      }\n      account {\n        uploader: address\n      }\n      access_config_permission\n      access_config_addresses\n      cw2_contract\n      cw2_version\n    }\n  }\n"];
export function graphql(
  source: "\n  query getCodeListCountByWalletAddress($walletAddress: String!) {\n    codes_aggregate(where: { account: { address: { _eq: $walletAddress } } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getCodeListCountByWalletAddress($walletAddress: String!) {\n    codes_aggregate(where: { account: { address: { _eq: $walletAddress } } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getInstantiatedListByUserQueryDocument($walletAddr: String!) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      label\n      address\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"
): typeof documents["\n  query getInstantiatedListByUserQueryDocument($walletAddr: String!) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n      limit: 100\n      offset: 0\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      label\n      address\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getInstantiatedCountByUserQueryDocument($walletAddr: String!) {\n    contracts_aggregate(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getInstantiatedCountByUserQueryDocument($walletAddr: String!) {\n    contracts_aggregate(\n      where: { accountByInitBy: { address: { _eq: $walletAddr } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: '\n  query getInstantiateDetailByContractQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      init_msg\n      transaction {\n        hash\n      }\n      contract_proposals(\n        where: {\n          proposal: {\n            type: {\n              _in: [\n                "InstantiateContract"\n                "InstantiateContract2"\n                "SoftwareUpgrade"\n              ]\n            }\n          }\n        }\n        order_by: { proposal: { id: asc } }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getInstantiateDetailByContractQueryDocument($contractAddress: String!) {\n    contracts_by_pk(address: $contractAddress) {\n      init_msg\n      transaction {\n        hash\n      }\n      contract_proposals(\n        where: {\n          proposal: {\n            type: {\n              _in: [\n                "InstantiateContract"\n                "InstantiateContract2"\n                "SoftwareUpgrade"\n              ]\n            }\n          }\n        }\n        order_by: { proposal: { id: asc } }\n        limit: 1\n      ) {\n        proposal {\n          id\n          title\n        }\n      }\n    }\n  }\n'];
export function graphql(
  source: "\n  query getAdminByContractAddressesQueryDocument(\n    $contractAddresses: [String!]!\n  ) {\n    contracts(where: { address: { _in: $contractAddresses } }) {\n      address\n      admin: account {\n        address\n      }\n    }\n  }\n"
): typeof documents["\n  query getAdminByContractAddressesQueryDocument(\n    $contractAddresses: [String!]!\n  ) {\n    contracts(where: { address: { _in: $contractAddresses } }) {\n      address\n      admin: account {\n        address\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getContractListByAdmin($address: String!) {\n    contracts(\n      where: { account: { address: { _eq: $address } } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"
): typeof documents["\n  query getContractListByAdmin($address: String!) {\n    contracts(\n      where: { account: { address: { _eq: $address } } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      accountByInitBy {\n        address\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getContractListByCodeIdPagination(\n    $codeId: Int!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { code_id: { _eq: $codeId } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"
): typeof documents["\n  query getContractListByCodeIdPagination(\n    $codeId: Int!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { code_id: { _eq: $codeId } }\n      order_by: { transaction: { block: { timestamp: desc } } }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getContractListCountByCodeId($codeId: Int!) {\n    contracts_aggregate(where: { code_id: { _eq: $codeId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getContractListCountByCodeId($codeId: Int!) {\n    contracts_aggregate(where: { code_id: { _eq: $codeId } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getMigrationHistoriesByContractAddress(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_histories(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { block: { timestamp: desc } }\n      limit: $pageSize\n      offset: $offset\n    ) {\n      code_id\n      account {\n        address\n      }\n      block {\n        height\n        timestamp\n      }\n      remark\n      code {\n        account {\n          address\n        }\n        cw2_contract\n        cw2_version\n      }\n    }\n  }\n"
): typeof documents["\n  query getMigrationHistoriesByContractAddress(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_histories(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { block: { timestamp: desc } }\n      limit: $pageSize\n      offset: $offset\n    ) {\n      code_id\n      account {\n        address\n      }\n      block {\n        height\n        timestamp\n      }\n      remark\n      code {\n        account {\n          address\n        }\n        cw2_contract\n        cw2_version\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getMigrationHistoriesCountByContractAddress($contractAddress: String!) {\n    contract_histories_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getMigrationHistoriesCountByContractAddress($contractAddress: String!) {\n    contract_histories_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getContractListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"
): typeof documents["\n  query getContractListByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { accountByInitBy: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getContractListByAdminPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"
): typeof documents["\n  query getContractListByAdminPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contracts(\n      where: { account: { address: { _eq: $walletAddress } } }\n      limit: $pageSize\n      offset: $offset\n      order_by: { transaction: { block: { timestamp: desc } } }\n    ) {\n      address\n      label\n      admin: account {\n        address\n      }\n      init_by: contract_histories(\n        order_by: { block: { timestamp: asc } }\n        limit: 1\n      ) {\n        account {\n          address\n        }\n      }\n      contract_histories(order_by: { block: { timestamp: desc } }, limit: 1) {\n        block {\n          timestamp\n        }\n        account {\n          address\n        }\n        remark\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getContractListCountByAdmin($walletAddress: String!) {\n    contracts_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getContractListCountByAdmin($walletAddress: String!) {\n    contracts_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getRelatedProposalsByContractAddressPagination(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_proposals(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { proposal_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      proposal {\n        title\n        status\n        voting_end_time\n        deposit_end_time\n        type\n        account {\n          address\n        }\n        is_expedited\n      }\n      proposal_id\n      resolved_height\n    }\n  }\n"
): typeof documents["\n  query getRelatedProposalsByContractAddressPagination(\n    $contractAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    contract_proposals(\n      where: { contract: { address: { _eq: $contractAddress } } }\n      order_by: { proposal_id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      proposal {\n        title\n        status\n        voting_end_time\n        deposit_end_time\n        type\n        account {\n          address\n        }\n        is_expedited\n      }\n      proposal_id\n      resolved_height\n    }\n  }\n"];
export function graphql(
  source: "\n  query getRelatedProposalsCountByContractAddress($contractAddress: String!) {\n    contract_proposals_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getRelatedProposalsCountByContractAddress($contractAddress: String!) {\n    contract_proposals_aggregate(\n      where: { contract: { address: { _eq: $contractAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getProposalsByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: { account: { address: { _eq: $walletAddress } } }\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      title\n      status\n      voting_end_time\n      deposit_end_time\n      type\n      id\n      is_expedited\n      resolved_height\n    }\n  }\n"
): typeof documents["\n  query getProposalsByWalletAddressPagination(\n    $walletAddress: String!\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: { account: { address: { _eq: $walletAddress } } }\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      title\n      status\n      voting_end_time\n      deposit_end_time\n      type\n      id\n      is_expedited\n      resolved_height\n    }\n  }\n"];
export function graphql(
  source: "\n  query getProposalsCountByWalletAddress($walletAddress: String!) {\n    proposals_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getProposalsCountByWalletAddress($walletAddress: String!) {\n    proposals_aggregate(\n      where: { account: { address: { _eq: $walletAddress } } }\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getProposalList(\n    $expression: proposals_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: $expression\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      type\n      id\n      title\n      voting_end_time\n      deposit_end_time\n      resolved_height\n      status\n      is_expedited\n      account {\n        address\n      }\n    }\n  }\n"
): typeof documents["\n  query getProposalList(\n    $expression: proposals_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    proposals(\n      where: $expression\n      order_by: { id: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      type\n      id\n      title\n      voting_end_time\n      deposit_end_time\n      resolved_height\n      status\n      is_expedited\n      account {\n        address\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getProposalListCount($expression: proposals_bool_exp) {\n    proposals_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getProposalListCount($expression: proposals_bool_exp) {\n    proposals_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getProposalTypes {\n    proposals(distinct_on: type) {\n      type\n    }\n  }\n"
): typeof documents["\n  query getProposalTypes {\n    proposals(distinct_on: type) {\n      type\n    }\n  }\n"];
export function graphql(
  source: "\n  query getTxsByAddressPagination(\n    $expression: account_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    account_transactions(\n      where: $expression\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_clear_admin\n        is_execute\n        is_ibc\n        is_instantiate\n        is_migrate\n        is_send\n        is_store_code\n        is_update_admin\n      }\n      is_signer\n    }\n  }\n"
): typeof documents["\n  query getTxsByAddressPagination(\n    $expression: account_transactions_bool_exp\n    $offset: Int!\n    $pageSize: Int!\n  ) {\n    account_transactions(\n      where: $expression\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      transaction {\n        account {\n          address\n        }\n        hash\n        success\n        messages\n        is_clear_admin\n        is_execute\n        is_ibc\n        is_instantiate\n        is_migrate\n        is_send\n        is_store_code\n        is_update_admin\n      }\n      is_signer\n    }\n  }\n"];
export function graphql(
  source: "\n  query getTxsCountByAddress($expression: account_transactions_bool_exp) {\n    account_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getTxsCountByAddress($expression: account_transactions_bool_exp) {\n    account_transactions_aggregate(where: $expression) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query getTxList($offset: Int!, $pageSize: Int!) {\n    transactions(\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_clear_admin\n      is_execute\n      is_ibc\n      is_instantiate\n      is_migrate\n      is_send\n      is_store_code\n      is_update_admin\n    }\n  }\n"
): typeof documents["\n  query getTxList($offset: Int!, $pageSize: Int!) {\n    transactions(\n      order_by: { block_height: desc }\n      offset: $offset\n      limit: $pageSize\n    ) {\n      block {\n        height\n        timestamp\n      }\n      account {\n        address\n      }\n      hash\n      success\n      messages\n      is_clear_admin\n      is_execute\n      is_ibc\n      is_instantiate\n      is_migrate\n      is_send\n      is_store_code\n      is_update_admin\n    }\n  }\n"];
export function graphql(
  source: "\n  query getTxListCount {\n    transactions_aggregate {\n      aggregate {\n        count\n      }\n    }\n  }\n"
): typeof documents["\n  query getTxListCount {\n    transactions_aggregate {\n      aggregate {\n        count\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
