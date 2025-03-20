import { getUsers } from "@/actions/users";

import UserForm from "./components/UserForm";
import TableControls from "./components/TableControls";
import CustomTable from "@/components/ui/table/CustomTable";


import { Column, SimplifiedUser } from "@/interfaces";


const usersColumns: Column<SimplifiedUser>[] = [
  {
    header: "Nombre",
    accessor: "name",
  },
  {
    header: "Correo",
    accessor: "email",
    capitalize: false,
  },
  {
    header: "Teléfono",
    accessor: "phone",
  },
  {
    header: "Roles",
    accessor: "roles",
    capitalize: false,
  },
];

export default async function Page() {

  const { data, error } = await getUsers();

  return (
    <div>
      {data && !error ? (
        <CustomTable
          data={data.users}
          columns={usersColumns}
          btnCreate={{
            text: "Crear Usuario",
            form: <UserForm />,
          }}
          pagination={{ totalPages: data.total }}
          isLoading={false}
          searcher={null}
          controls={(item) => (
            <TableControls
              item={item}
            />
          )}
        />
      ) : null}

    </div>
  );
}