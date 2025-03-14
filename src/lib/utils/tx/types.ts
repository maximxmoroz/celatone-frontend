import type { Coin } from "@cosmjs/stargate";

import type { TypeUrl } from "lib/data";
import type {
  Addr,
  ContractAddr,
  AccessConfigPermission,
  Option,
  ValidatorAddr,
  Nullable,
} from "lib/types";

import type { VoteOption } from "./mapping";

export interface MsgBaseDetails {
  type: string;
}

export interface MsgUnknownDetails extends MsgBaseDetails {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface InstantiatePermissionResponse {
  permission: AccessConfigPermission;
  address: Addr;
  // Remark: addresses will undefined in case of Cosmos SDK v0.26
  addresses?: Addr[];
}

// cosmwasm/wasm
export interface MsgStoreCodeDetails extends MsgBaseDetails {
  code_id: Option<string>;
  sender: Addr;
  wasm_byte_code: string; // base64
  instantiate_permission: Nullable<InstantiatePermissionResponse>;
}

export interface MsgInstantiateDetails extends MsgBaseDetails {
  contract_address: Option<ContractAddr>;
  sender: Addr;
  admin: Addr;
  code_id: string;
  label: string;
  msg: object;
  funds: Coin[];
}

export interface MsgInstantiate2Details extends MsgInstantiateDetails {
  salt: string;
  fix_msg: boolean;
}

export interface MsgExecuteDetails extends MsgBaseDetails {
  sender: Addr;
  contract: ContractAddr;
  msg: object;
  funds: Coin[];
}

export interface MsgMigrateDetails extends MsgBaseDetails {
  sender: Addr;
  contract: ContractAddr;
  code_id: string;
  msg: object;
}

export interface MsgUpdateAdminDetails extends MsgBaseDetails {
  sender: Addr;
  new_admin: Addr;
  contract: ContractAddr;
}

export interface MsgClearAdminDetails extends MsgBaseDetails {
  sender: Addr;
  contract: ContractAddr;
}

// x/authz
export interface MsgGrantDetails extends MsgBaseDetails {
  granter: Addr;
  grantee: Addr;
  grant: object;
}
export interface MsgRevokeDetails extends MsgBaseDetails {
  granter: Addr;
  grantee: Addr;
  msg_type_url: string;
}
export interface MsgExecDetails extends MsgBaseDetails {
  grantee: Addr;
  msgs: object[];
  msg_type_url: string;
}

// x/bank
export interface MsgSendDetails extends MsgBaseDetails {
  from_address: Addr;
  to_address: Addr;
  amount: Coin[];
}
export interface MsgMultiSendDetails extends MsgBaseDetails {
  inputs: object;
  outputs: object;
}

// x/crisis
export interface MsgVerifyInvariantDetails extends MsgBaseDetails {
  sender: Addr;
  invariant_module_name: string;
  invariant_route: string;
}

// x/distribution
export interface MsgSetWithdrawAddressDetails extends MsgBaseDetails {
  delegator_address: Addr;
  withdraw_address: Addr;
}
export interface MsgWithdrawDelegatorRewardDetails extends MsgBaseDetails {
  delegator_address: Addr;
  validator_address: ValidatorAddr;
}
export interface MsgWithdrawValidatorCommissionDetails extends MsgBaseDetails {
  validator_address: ValidatorAddr;
}
export interface MsgFundCommunityPoolDetails extends MsgBaseDetails {
  amount: Coin[];
  depositor: Addr;
}

// x/evidence
export interface MsgSubmitEvidenceDetails extends MsgBaseDetails {
  submitter: Addr;
  evidence: object;
}

// x/feegrant
export interface MsgGrantAllowanceDetails extends MsgBaseDetails {
  granter: Addr;
  grantee: Addr;
  allowance: object;
}
export interface MsgRevokeAllowanceDetails extends MsgBaseDetails {
  granter: Addr;
  grantee: Addr;
}

// x/gov
export interface MsgSubmitProposalDetails extends MsgBaseDetails {
  initial_deposit: Coin[];
  proposer: Addr;
  proposal_id: Option<string>;
  proposal_type: Option<string>;
  content: {
    "@type": string;
    description: string;
    subject_client_id: string;
    substitute_client_id: string;
    title: string;
    changes?: { key: string; subspace: string; value: string }[];
  };
  is_expedited?: boolean;
}
export interface MsgVoteDetails extends MsgBaseDetails {
  proposal_id: string;
  voter: Addr;
  option: VoteOption;
}
export interface MsgVoteWeightedDetails extends MsgBaseDetails {
  proposal_id: string;
  voter: Addr;
  options: { option: VoteOption; weight: string }[];
}
export interface MsgDepositDetails extends MsgBaseDetails {
  proposal_id: string;
  depositor: Addr;
  amount: Coin[];
}

// x/slashing
export interface MsgUnjailDetails extends MsgBaseDetails {
  validator_addr: ValidatorAddr;
}

// x/staking
export interface MsgCreateValidatorDetails extends MsgBaseDetails {
  description: object;
  commission: object;
  min_self_delegation: string;
  delegator_address: Addr;
  validator_address: ValidatorAddr;
  pubkey: object;
  value: Coin;
}
export interface MsgEditValidatorDetails extends MsgBaseDetails {
  description: object;
  validator_address: ValidatorAddr;
  commission_rate: string;
  min_self_delegation: string;
}
export interface MsgDelegateDetails extends MsgBaseDetails {
  delegator_address: Addr;
  validator_address: ValidatorAddr;
  amount: Coin;
}
export interface MsgBeginRedelegateDetails extends MsgBaseDetails {
  delegator_address: Addr;
  validator_src_address: ValidatorAddr;
  validator_dst_address: ValidatorAddr;
  amount: Coin;
}
export interface MsgUndelegateDetails extends MsgBaseDetails {
  delegator_address: Addr;
  validator_address: ValidatorAddr;
  amount: Coin;
}

// ibc/applications
export interface MsgTransferDetails extends MsgBaseDetails {
  source_port: string;
  source_channel: string;
  token: Coin;
  sender: Addr;
  receiver: Addr;
  timeout_height: object;
  timeout_timestamp: string;
  memo: string;
}

// ibc/core
export interface MsgCreateClientDetails extends MsgBaseDetails {
  client_state: object;
  consensus_state: object;
  signer: Addr;
}
export interface MsgUpdateClientDetails extends MsgBaseDetails {
  client_id: string;
  // newer version
  client_message?: object;
  // older version
  header?: object;
  signer: Addr;
}
export interface MsgUpgradeClientDetails extends MsgBaseDetails {
  client_id: string;
  client_state: object;
  consensus_state: object;
  proof_upgrade_client: string;
  proof_upgrade_consensus_state: string;
  signer: Addr;
}
export interface MsgSubmitMisbehaviourDetails extends MsgBaseDetails {
  client_id: string;
  misbehaviour: object;
  signer: Addr;
}
export interface MsgConnectionOpenInitDetails extends MsgBaseDetails {
  client_id: string;
  counterparty: object;
  version: object;
  delay_period: number;
  signer: Addr;
}
export interface MsgConnectionOpenTryDetails extends MsgBaseDetails {
  client_id: string;
  previous_connection_id: string;
  client_state: object;
  counterparty: object;
  delay_period: number;
  counterparty_versions: object;
  proof_height: object;
  proof_init: string;
  proof_client: string;
  proof_consensus: string;
  consensus_height: object;
  signer: Addr;
}
export interface MsgConnectionOpenAckDetails extends MsgBaseDetails {
  connection_id: string;
  counterparty_connection_id: string;
  version: object;
  client_state: object;
  proof_height: object;
  proof_try: string;
  proof_client: string;
  proof_consensus: string;
  consensus_height: object;
  signer: Addr;
}
export interface MsgConnectionOpenConfirmDetails extends MsgBaseDetails {
  connection_id: string;
  proof_ack: string;
  proof_height: object;
  signer: Addr;
}
export interface MsgChannelOpenInitDetails extends MsgBaseDetails {
  port_id: string;
  channel: object;
  signer: Addr;
}
export interface MsgChannelOpenTryDetails extends MsgBaseDetails {
  port_id: string;
  previous_channel_id: string;
  channel: object;
  counterparty_version: string;
  proof_init: string;
  proof_height: object;
  signer: Addr;
}
export interface MsgChannelOpenAckDetails extends MsgBaseDetails {
  port_id: string;
  channel_id: string;
  counterparty_channel_id: string;
  counterparty_version: string;
  proof_try: string;
  proof_height: object;
  signer: Addr;
}
export interface MsgChannelOpenConfirmDetails extends MsgBaseDetails {
  port_id: string;
  channel_id: string;
  proof_ack: string;
  proof_height: object;
  signer: Addr;
}
export interface MsgChannelCloseInitDetails extends MsgBaseDetails {
  port_id: string;
  channel_id: string;
  signer: Addr;
}
export interface MsgChannelCloseConfirmDetails extends MsgBaseDetails {
  port_id: string;
  channel_id: string;
  proof_init: string;
  proof_height: object;
  signer: Addr;
}
export interface MsgRecvPacketDetails extends MsgBaseDetails {
  packet: object;
  proof_commitment: string;
  proof_height: object;
  signer: Addr;
}
export interface MsgTimeoutDetails extends MsgBaseDetails {
  packet: object;
  proof_unreceived: string;
  proof_height: object;
  next_sequence_recv: number;
  signer: Addr;
}
export interface MsgTimeoutOnCloseDetails extends MsgBaseDetails {
  packet: object;
  proof_unreceived: string;
  proof_close: string;
  proof_height: object;
  next_sequence_recv: number;
  signer: Addr;
}
export interface MsgAcknowledgementDetails extends MsgBaseDetails {
  packet: object;
  acknowledgement: string;
  proof_acked: string;
  proof_height: object;
  signer: Addr;
}

// osmosis/gamm
export interface MsgCreateBalancerPoolDetails extends MsgBaseDetails {
  sender: Addr;
  pool_params: object;
  pool_assets: object;
  future_pool_governor: string;
}
export interface MsgCreateStableswapPoolDetails extends MsgBaseDetails {
  sender: Addr;
  pool_params: object;
  initial_pool_liquidity: Coin[];
  scaling_factors: string[];
  future_pool_governor: string;
  scaling_factor_controller: string;
}
export interface MsgStableSwapAdjustScalingFactorsDetails
  extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  scaling_factors: string[];
}
export interface MsgJoinPoolDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  share_out_amount: string;
  token_in_maxs: Coin[];
}
export interface MsgExitPoolDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  share_in_amount: string;
  token_out_mins: Coin[];
}
export interface MsgSwapExactAmountInDetails extends MsgBaseDetails {
  sender: Addr;
  routes: { poolId: number; tokenOutDenom: string }[];
  token_in: Coin;
  token_out_min_amount: string;
}
export interface MsgSwapExactAmountOutDetails extends MsgBaseDetails {
  sender: Addr;
  routes: { poolId: number; tokenInDenom: string }[];
  token_in_max_amount: string;
  token_out: Coin;
}
export interface MsgJoinSwapExternAmountInDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  token_in: Coin;
  share_out_min_amount: string;
}
export interface MsgJoinSwapShareAmountOutDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  token_in_denom: string;
  share_out_amount: string;
  token_in_max_amount: string;
}
export interface MsgExitSwapShareAmountInDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  token_out_denom: string;
  share_in_amount: string;
  token_out_min_amount: string;
}
export interface MsgExitSwapExternAmountOutDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
  token_out: Coin;
  share_in_max_amount: string;
}

// osmosis/incentives
export interface MsgCreateGaugeDetails extends MsgBaseDetails {
  is_perpetual: boolean;
  owner: Addr;
  distribute_to: object;
  coins: Coin[];
  start_time: string;
  num_epochs_paid_over: string;
}
export interface MsgAddToGaugeDetails extends MsgBaseDetails {
  owner: Addr;
  gauge_id: string;
  rewards: Coin[];
}

// osmosis/lockup
export interface MsgLockTokensDetails extends MsgBaseDetails {
  owner: Addr;
  duration: string | number;
  coins: Coin[];
}
export interface MsgBeginUnlockingAllDetails extends MsgBaseDetails {
  owner: Addr;
}
export interface MsgBeginUnlockingDetails extends MsgBaseDetails {
  owner: Addr;
  ID: string;
  coins?: Coin[];
}
export interface MsgExtendLockupDetails extends MsgBaseDetails {
  owner: Addr;
  ID: string;
  duration: string | number;
}
export interface MsgForceUnlockDetails extends MsgBaseDetails {
  owner: Addr;
  ID: string;
  coins?: Coin[];
}

export interface MsgSetRewardReceiverAddressDetails extends MsgBaseDetails {
  owner: Addr;
  lock_id: string;
  reward_receiver: Addr;
}

// osmosis/superfluid
export interface MsgSuperfluidDelegateDetails extends MsgBaseDetails {
  sender: Addr;
  lock_id: string;
  val_addr: ValidatorAddr;
}
export interface MsgSuperfluidUndelegateDetails extends MsgBaseDetails {
  sender: Addr;
  lock_id: string;
}
export interface MsgSuperfluidUnbondLockDetails extends MsgBaseDetails {
  sender: Addr;
  lock_id: string;
}
export interface MsgLockAndSuperfluidDelegateDetails extends MsgBaseDetails {
  sender: Addr;
  coins: Coin[];
  val_addr: ValidatorAddr;
}
export interface MsgUnPoolWhitelistedPoolDetails extends MsgBaseDetails {
  sender: Addr;
  pool_id: string;
}
export interface MsgSuperfluidUndelegateAndUnbondLockDetails
  extends MsgBaseDetails {
  sender: Addr;
  lock_id: string;
  coin: Coin;
}

export interface MsgCreateFullRangePositionAndSuperfluidDelegateDetails
  extends MsgBaseDetails {
  sender: Addr;
  coins: Coin[];
  val_addr: ValidatorAddr;
  pool_id: string;
}
export interface MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionDetails
  extends MsgBaseDetails {
  sender: Addr;
  lock_id: string;
  shares_to_migrate: Coin;
  token_out_mins: Coin[];
}
export interface MsgAddToConcentratedLiquiditySuperfluidPositionDetails
  extends MsgBaseDetails {
  position_id: string;
  sender: Addr;
  token_desired0: Coin;
  token_desired1: Coin;
}
export interface MsgLockExistingFullRangePositionAndSFStakeDetails
  extends MsgBaseDetails {
  position_id: string;
  sender: Addr;
  val_addr: ValidatorAddr;
}

// osmosis/tokenfactory
export interface MsgCreateDenomDetails extends MsgBaseDetails {
  sender: Addr;
  subdenom: string;
}
export interface MsgMintDetails extends MsgBaseDetails {
  sender: Addr;
  amount: Coin;
}
export interface MsgBurnDetails extends MsgBaseDetails {
  sender: Addr;
  amount: Coin;
}
export interface MsgChangeAdminDetails extends MsgBaseDetails {
  sender: Addr;
  denom: string;
  new_admin: Addr;
}
export interface MsgSetDenomMetadataDetails extends MsgBaseDetails {
  sender: Addr;
  metadata: object;
}

export interface MsgForceTransferDetails extends MsgBaseDetails {
  sender: Addr;
  amount: Coin;
  transfer_from_address: Addr;
  transfer_to_address: Addr;
}
export interface MsgSetBeforeSendHookDetails extends MsgBaseDetails {
  sender: Addr;
  denom: string;
  cosmwasm_address: string;
}

// osmosis/protorev
export interface MsgSetHotRoutesDetails extends MsgBaseDetails {
  admin: Addr;
  hot_routes: object[];
}
export interface MsgSetBaseDenomsDetails extends MsgBaseDetails {
  admin: Addr;
  base_denoms: object[];
}
export interface MsgSetDeveloperAccountDetails extends MsgBaseDetails {
  admin: Addr;
  developer_account: Addr;
}
export interface MsgSetPoolWeightsDetails extends MsgBaseDetails {
  admin: Addr;
  pool_weights: object;
}
export interface MsgSetMaxPoolPointsPerTxDetails extends MsgBaseDetails {
  admin: Addr;
  max_pool_points_per_tx: string;
}
export interface MsgSetMaxPoolPointsPerBlockDetails extends MsgBaseDetails {
  admin: Addr;
  max_pool_points_per_block: string;
}

// osmosis/valset-pref
export interface MsgDelegateToValidatorSetDetails extends MsgBaseDetails {
  delegator: Addr;
  coin: Coin;
}
export interface MsgUndelegateFromValidatorSetDetails extends MsgBaseDetails {
  delegator: Addr;
  coin: Coin;
}
export interface MsgRedelegateValidatorSetDetails extends MsgBaseDetails {
  delegator: Addr;
  preferences: object[];
}
export interface MsgWithdrawDelegationRewardsDetails extends MsgBaseDetails {
  delegator: Addr;
}
export interface MsgDelegateBondedTokensDetails extends MsgBaseDetails {
  delegator: Addr;
  lockID: string;
}
export interface MsgSetValidatorSetPreferenceDetails extends MsgBaseDetails {
  delegator: Addr;
  preferences: object[];
}

// osmosis/poolmanager
export interface MsgSplitRouteSwapExactAmountInDetails extends MsgBaseDetails {
  sender: Addr;
  routes: object[];
  token_in_denom: string;
  token_out_min_amount: string;
}
export interface MsgSplitRouteSwapExactAmountOutDetails extends MsgBaseDetails {
  sender: Addr;
  routes: object[];
  token_out_denom: string;
  token_in_max_amount: string;
}

// osmosis/concentratedliquidity
export interface MsgCreatePositionDetails extends MsgBaseDetails {
  pool_id: string;
  sender: Addr;
  lower_tick: string;
  upper_tick: string;
  tokens_provided: Coin[];
  token_min_amount0: string;
  token_min_amount1: string;
}
export interface MsgAddToPositionDetails extends MsgBaseDetails {
  position_id: string;
  sender: Addr;
  amount0: string;
  amount1: string;
  token_min_amount0: string;
  token_min_amount1: string;
}
export interface MsgWithdrawPositionDetails extends MsgBaseDetails {
  position_id: string;
  sender: Addr;
  liquidity_amount: string;
}
export interface MsgCollectSpreadRewardsDetails extends MsgBaseDetails {
  position_ids: string[];
  sender: Addr;
}
export interface MsgCollectIncentivesDetails extends MsgBaseDetails {
  position_ids: string[];
  sender: Addr;
}
export interface MsgCreateConcentratedPoolDetails extends MsgBaseDetails {
  sender: Addr;
  denom0: string;
  denom1: string;
  tick_spacing: string;
  spread_factor: string;
}

// osmosis/cosmwasmpool
export interface MsgCreateCosmWasmPoolDetails extends MsgBaseDetails {
  code_id: string;
  instantiate_msg: string;
  sender: string;
}

export type MsgReturnType<T extends TypeUrl> =
  T extends "/cosmwasm.wasm.v1.MsgStoreCode"
    ? MsgStoreCodeDetails
    : T extends "/cosmwasm.wasm.v1.MsgInstantiateContract"
    ? MsgInstantiateDetails
    : T extends "/cosmwasm.wasm.v1.MsgInstantiateContract2"
    ? MsgInstantiate2Details
    : T extends "/cosmwasm.wasm.v1.MsgExecuteContract"
    ? MsgExecuteDetails
    : T extends "/cosmwasm.wasm.v1.MsgMigrateContract"
    ? MsgMigrateDetails
    : T extends "/cosmwasm.wasm.v1.MsgUpdateAdmin"
    ? MsgUpdateAdminDetails
    : T extends "/cosmwasm.wasm.v1.MsgClearAdmin"
    ? MsgClearAdminDetails
    : T extends "/cosmos.bank.v1beta1.MsgSend"
    ? MsgSendDetails
    : T extends "/cosmos.bank.v1beta1.MsgMultiSend"
    ? MsgMultiSendDetails
    : T extends "/cosmos.authz.v1beta1.MsgGrant"
    ? MsgGrantDetails
    : T extends "/cosmos.authz.v1beta1.MsgRevoke"
    ? MsgRevokeDetails
    : T extends "/cosmos.authz.v1beta1.MsgExec"
    ? MsgExecDetails
    : T extends "/cosmos.crisis.v1beta1.MsgVerifyInvariant"
    ? MsgVerifyInvariantDetails
    : T extends "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress"
    ? MsgSetWithdrawAddressDetails
    : T extends "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
    ? MsgWithdrawDelegatorRewardDetails
    : T extends "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission"
    ? MsgWithdrawValidatorCommissionDetails
    : T extends "/cosmos.distribution.v1beta1.MsgFundCommunityPool"
    ? MsgFundCommunityPoolDetails
    : T extends "/cosmos.evidence.v1beta1.MsgSubmitEvidence"
    ? MsgSubmitEvidenceDetails
    : T extends "/cosmos.feegrant.v1beta1.MsgGrantAllowance"
    ? MsgGrantAllowanceDetails
    : T extends "/cosmos.feegrant.v1beta1.MsgRevokeAllowance"
    ? MsgRevokeAllowanceDetails
    : T extends "/cosmos.gov.v1beta1.MsgSubmitProposal"
    ? MsgSubmitProposalDetails
    : T extends "/cosmos.gov.v1beta1.MsgVote"
    ? MsgVoteDetails
    : T extends "/cosmos.gov.v1beta1.MsgVoteWeighted"
    ? MsgVoteWeightedDetails
    : T extends "/cosmos.gov.v1beta1.MsgDeposit"
    ? MsgDepositDetails
    : T extends "/cosmos.slashing.v1beta1.MsgUnjail"
    ? MsgUnjailDetails
    : T extends "/cosmos.staking.v1beta1.MsgCreateValidator"
    ? MsgCreateValidatorDetails
    : T extends "/cosmos.staking.v1beta1.MsgEditValidator"
    ? MsgEditValidatorDetails
    : T extends "/cosmos.staking.v1beta1.MsgDelegate"
    ? MsgDelegateDetails
    : T extends "/cosmos.staking.v1beta1.MsgUndelegate"
    ? MsgUndelegateDetails
    : T extends "/cosmos.staking.v1beta1.MsgBeginRedelegate"
    ? MsgBeginRedelegateDetails
    : T extends "/ibc.applications.transfer.v1.MsgTransfer"
    ? MsgTransferDetails
    : T extends "/ibc.core.client.v1.MsgCreateClient"
    ? MsgCreateClientDetails
    : T extends "/ibc.core.client.v1.MsgUpdateClient"
    ? MsgUpdateClientDetails
    : T extends "/ibc.core.client.v1.MsgUpgradeClient"
    ? MsgUpgradeClientDetails
    : T extends "/ibc.core.client.v1.MsgSubmitMisbehaviour"
    ? MsgSubmitMisbehaviourDetails
    : T extends "/ibc.core.connection.v1.MsgConnectionOpenInit"
    ? MsgConnectionOpenInitDetails
    : T extends "/ibc.core.connection.v1.MsgConnectionOpenTry"
    ? MsgConnectionOpenTryDetails
    : T extends "/ibc.core.connection.v1.MsgConnectionOpenAck"
    ? MsgConnectionOpenAckDetails
    : T extends "/ibc.core.connection.v1.MsgConnectionOpenConfirm"
    ? MsgConnectionOpenConfirmDetails
    : T extends "/ibc.core.channel.v1.MsgChannelOpenInit"
    ? MsgChannelOpenInitDetails
    : T extends "/ibc.core.channel.v1.MsgChannelOpenTry"
    ? MsgChannelOpenTryDetails
    : T extends "/ibc.core.channel.v1.MsgChannelOpenAck"
    ? MsgChannelOpenAckDetails
    : T extends "/ibc.core.channel.v1.MsgChannelOpenConfirm"
    ? MsgChannelOpenConfirmDetails
    : T extends "/ibc.core.channel.v1.MsgChannelCloseInit"
    ? MsgChannelCloseInitDetails
    : T extends "/ibc.core.channel.v1.MsgChannelCloseConfirm"
    ? MsgChannelCloseConfirmDetails
    : T extends "/ibc.core.channel.v1.MsgRecvPacket"
    ? MsgRecvPacketDetails
    : T extends "/ibc.core.channel.v1.MsgTimeout"
    ? MsgTimeoutDetails
    : T extends "/ibc.core.channel.v1.MsgTimeoutOnClose"
    ? MsgTimeoutOnCloseDetails
    : T extends "/ibc.core.channel.v1.MsgAcknowledgement"
    ? MsgAcknowledgementDetails
    : T extends "/osmosis.gamm.poolmodels.balancer.v1beta1.MsgCreateBalancerPool"
    ? MsgCreateBalancerPoolDetails
    : T extends "/osmosis.gamm.poolmodels.stableswap.v1beta1.MsgCreateStableswapPool"
    ? MsgCreateStableswapPoolDetails
    : T extends "/osmosis.gamm.poolmodels.stableswap.v1beta1.MsgStableSwapAdjustScalingFactors"
    ? MsgStableSwapAdjustScalingFactorsDetails
    : T extends "/osmosis.gamm.v1beta1.MsgJoinPool"
    ? MsgJoinPoolDetails
    : T extends "/osmosis.gamm.v1beta1.MsgExitPool"
    ? MsgExitPoolDetails
    : T extends
        | "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn"
        | "/osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn"
    ? MsgSwapExactAmountInDetails
    : T extends
        | "/osmosis.gamm.v1beta1.MsgSwapExactAmountOut"
        | "/osmosis.poolmanager.v1beta1.MsgSwapExactAmountOut"
    ? MsgSwapExactAmountOutDetails
    : T extends "/osmosis.poolmanager.v1beta1.MsgSplitRouteSwapExactAmountIn"
    ? MsgSplitRouteSwapExactAmountInDetails
    : T extends "/osmosis.poolmanager.v1beta1.MsgSplitRouteSwapExactAmountOut"
    ? MsgSplitRouteSwapExactAmountOutDetails
    : T extends "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn"
    ? MsgJoinSwapExternAmountInDetails
    : T extends "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut"
    ? MsgJoinSwapShareAmountOutDetails
    : T extends "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn"
    ? MsgExitSwapShareAmountInDetails
    : T extends "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut"
    ? MsgExitSwapExternAmountOutDetails
    : T extends "/osmosis.incentives.MsgCreateGauge"
    ? MsgCreateGaugeDetails
    : T extends "/osmosis.incentives.MsgAddToGauge"
    ? MsgAddToGaugeDetails
    : T extends "/osmosis.lockup.MsgLockTokens"
    ? MsgLockTokensDetails
    : T extends "/osmosis.lockup.MsgBeginUnlockingAll"
    ? MsgBeginUnlockingAllDetails
    : T extends "/osmosis.lockup.MsgBeginUnlocking"
    ? MsgBeginUnlockingDetails
    : T extends "/osmosis.lockup.MsgForceUnlock"
    ? MsgForceUnlockDetails
    : T extends "/osmosis.lockup.MsgExtendLockup"
    ? MsgExtendLockupDetails
    : T extends "/osmosis.lockup.MsgSetRewardReceiverAddress"
    ? MsgSetRewardReceiverAddressDetails
    : T extends "/osmosis.superfluid.MsgSuperfluidDelegate"
    ? MsgSuperfluidDelegateDetails
    : T extends "/osmosis.superfluid.MsgSuperfluidUndelegate"
    ? MsgSuperfluidUndelegateDetails
    : T extends "/osmosis.superfluid.MsgSuperfluidUnbondLock"
    ? MsgSuperfluidUnbondLockDetails
    : T extends "/osmosis.superfluid.MsgLockAndSuperfluidDelegate"
    ? MsgLockAndSuperfluidDelegateDetails
    : T extends "/osmosis.superfluid.MsgUnPoolWhitelistedPool"
    ? MsgUnPoolWhitelistedPoolDetails
    : T extends "/osmosis.superfluid.MsgSuperfluidUndelegateAndUnbondLock"
    ? MsgSuperfluidUndelegateAndUnbondLockDetails
    : T extends "/osmosis.superfluid.MsgCreateFullRangePositionAndSuperfluidDelegate"
    ? MsgCreateFullRangePositionAndSuperfluidDelegateDetails
    : T extends "/osmosis.superfluid.MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition"
    ? MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionDetails
    : T extends "/osmosis.superfluid.MsgAddToConcentratedLiquiditySuperfluidPosition"
    ? MsgAddToConcentratedLiquiditySuperfluidPositionDetails
    : T extends "/osmosis.superfluid.MsgLockExistingFullRangePositionAndSFStake"
    ? MsgLockExistingFullRangePositionAndSFStakeDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgCreateDenom"
    ? MsgCreateDenomDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgMint"
    ? MsgMintDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgBurn"
    ? MsgBurnDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgChangeAdmin"
    ? MsgChangeAdminDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata"
    ? MsgSetDenomMetadataDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgForceTransfer"
    ? MsgForceTransferDetails
    : T extends "/osmosis.tokenfactory.v1beta1.MsgSetBeforeSendHook"
    ? MsgSetBeforeSendHookDetails
    : T extends "/osmosis.protorev.v1beta1.MsgSetHotRoutes"
    ? MsgSetHotRoutesDetails
    : T extends "/osmosis.protorev.v1beta1.MsgSetBaseDenoms"
    ? MsgSetBaseDenomsDetails
    : T extends "/osmosis.protorev.v1beta1.MsgSetDeveloperAccount"
    ? MsgSetDeveloperAccountDetails
    : T extends "/osmosis.protorev.v1beta1.MsgSetPoolWeights"
    ? MsgSetPoolWeightsDetails
    : T extends "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx"
    ? MsgSetMaxPoolPointsPerTxDetails
    : T extends "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock"
    ? MsgSetMaxPoolPointsPerBlockDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgDelegateToValidatorSet"
    ? MsgDelegateToValidatorSetDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgUndelegateFromValidatorSet"
    ? MsgUndelegateFromValidatorSetDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgRedelegateValidatorSet"
    ? MsgRedelegateValidatorSetDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgWithdrawDelegationRewards"
    ? MsgWithdrawDelegationRewardsDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgDelegateBondedTokens"
    ? MsgDelegateBondedTokensDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgSetValidatorSetPreference"
    ? MsgSetValidatorSetPreferenceDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgCreatePosition"
    ? MsgCreatePositionDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgAddToPosition"
    ? MsgAddToPositionDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgWithdrawPosition"
    ? MsgWithdrawPositionDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgCollectSpreadRewards"
    ? MsgCollectSpreadRewardsDetails
    : T extends "/osmosis.valsetpref.v1beta1.MsgCollectIncentives"
    ? MsgCollectIncentivesDetails
    : T extends "/osmosis.concentratedliquidity.poolmodel.concentrated.v1beta1.MsgCreateConcentratedPool"
    ? MsgCreateConcentratedPoolDetails
    : T extends "/osmosis.cosmwasmpool.v1beta1.MsgCreateCosmWasmPool"
    ? MsgCreateCosmWasmPoolDetails
    : MsgBaseDetails;
