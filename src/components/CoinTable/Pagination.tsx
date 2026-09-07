type PaginationProps = {
  setPage: (page: number) => void;
};
export const Pagination: React.FC<PaginationProps> = ({ setPage }) => {
  return (
    <>
      <button onClick={() => setPage(1)}>1</button>
      <button onClick={() => setPage(2)}>2</button>
      <button onClick={() => setPage(3)}>3</button>
    </>
  );
};
