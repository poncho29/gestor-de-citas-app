import { SimplifiedUser } from "@/interfaces";
import { getUsers } from "@/actions/users";
import TableUsers from "./components/TableUsers";

export default async function Page() {

  const users: SimplifiedUser[] = await getUsers(10, 0);
  return (
    <div>
      <TableUsers users={users} />
    </div>
  );

}