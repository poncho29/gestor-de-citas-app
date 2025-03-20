import { getUsers } from "@/actions/users";

import TableUsers from "./components/TableUsers";

export default async function Page() {
  const { data } = await getUsers(10, 0);

  console.log(data);

  return (
    <div>
      <TableUsers users={data?.users || []} />
    </div>
  );

}