import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useWallet } from "@cosmos-kit/react";
import { useQuery } from "@tanstack/react-query";

import { useDummyWallet } from "lib/hooks";
import type { ComposedMsg, Gas } from "lib/types";

interface SimulateQueryParams {
  enabled: boolean;
  messages: ComposedMsg[];
  onSuccess?: (gas: Gas<number> | undefined) => void;
  onError?: (err: Error) => void;
}

export const useSimulateFeeQuery = ({
  enabled,
  messages,
  onSuccess,
  onError,
}: SimulateQueryParams) => {
  const { address, getCosmWasmClient, currentChainName, currentChainRecord } =
    useWallet();
  const { dummyWallet, dummyAddress } = useDummyWallet();

  const userAddress = address || dummyAddress;

  const simulateFn = async (msgs: ComposedMsg[]) => {
    let client = await getCosmWasmClient();
    // TODO: revisit this logic
    if (!currentChainRecord?.preferredEndpoints?.rpc?.[0] || !userAddress) {
      throw new Error("No RPC endpoint or user address");
    }

    if (!client && !address && dummyWallet) {
      client = await SigningCosmWasmClient.connectWithSigner(
        currentChainRecord.preferredEndpoints.rpc[0],
        dummyWallet
      );
    }

    if (!client) {
      throw new Error("No client");
    }

    return (await client.simulate(userAddress, msgs, undefined)) as Gas;
  };

  return useQuery({
    queryKey: ["simulate", currentChainName, userAddress, messages],
    queryFn: async ({ queryKey }) => simulateFn(queryKey[3] as ComposedMsg[]),
    enabled,
    keepPreviousData: true,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};
