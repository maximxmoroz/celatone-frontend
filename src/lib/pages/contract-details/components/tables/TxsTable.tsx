import type { ChangeEvent } from "react";

import { Pagination } from "lib/components/pagination";
import { usePaginator } from "lib/components/pagination/usePaginator";
import { EmptyState } from "lib/components/state";
import { TransactionsTable } from "lib/components/table";
import { DEFAULT_TX_FILTERS } from "lib/data";
import { useTxsByAddressPagination } from "lib/services/txService";
import type { Nullable, Option } from "lib/types";

interface TxsTableProps {
  contractAccountId: Option<Nullable<number>>;
  scrollComponentId: string;
  totalData: Option<number>;
  refetchCount: () => void;
}

export const TxsTable = ({
  contractAccountId,
  scrollComponentId,
  totalData,
  refetchCount,
}: TxsTableProps) => {
  const {
    pagesQuantity,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    offset,
  } = usePaginator({
    total: totalData,
    initialState: {
      pageSize: 10,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const { data: transactions, isLoading } = useTxsByAddressPagination(
    contractAccountId,
    "",
    DEFAULT_TX_FILTERS,
    undefined,
    offset,
    pageSize
  );

  const onPageChange = (nextPage: number) => {
    refetchCount();
    setCurrentPage(nextPage);
  };

  const onPageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    refetchCount();
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <TransactionsTable
        transactions={transactions}
        isLoading={isLoading}
        emptyState={
          <EmptyState
            imageVariant="empty"
            message="This contract does not have any transactions"
          />
        }
        showRelations={false}
      />
      {!!totalData && totalData > 10 && (
        <Pagination
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          offset={offset}
          totalData={totalData}
          scrollComponentId={scrollComponentId}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </>
  );
};
