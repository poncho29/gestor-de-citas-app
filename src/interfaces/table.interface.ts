export type Column<T> = {
  header: string;
  accessor: keyof T;
  sorteable?: boolean;
  sortOrder?: "asc" | "desc" | null;
  capitalize?: boolean;
};
