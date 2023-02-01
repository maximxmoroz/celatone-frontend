import { chakra, Tag } from "@chakra-ui/react";
import type { CSSProperties } from "react";

import type { ContractRelatedProposals } from "lib/types";
import { ProposalStatus } from "lib/types";

const StyledTag = chakra(Tag, {
  baseStyle: {
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: 400,
    color: "text.main",
    height: "24px",
    w: "fit-content",
  },
});

const getBgColor = (
  status: ContractRelatedProposals["status"]
): CSSProperties["backgroundColor"] => {
  switch (status) {
    case ProposalStatus.DEPOSIT_PERIOD:
      return "lilac.darker";
    case ProposalStatus.FAILED:
    case ProposalStatus.REJECTED:
      return "error.dark";
    case ProposalStatus.PASSED:
      return "success.dark";
    case ProposalStatus.VOTING_PERIOD:
      return "violet.dark";
    case ProposalStatus.INACTIVE:
    default:
      return "pebble.700";
  }
};

export const StatusChip = ({
  status,
}: {
  status: ContractRelatedProposals["status"];
}) => {
  return <StyledTag bgColor={getBgColor(status)}>{status}</StyledTag>;
};
