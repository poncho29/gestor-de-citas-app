import { getServices } from "@/actions/services/getServices-action";
import { SimplifiedService } from "@/interfaces/services.interfaces";
import Table from "./components/Table";

export default async function Page() {
  const services: SimplifiedService[] = await getServices(10, 0);
  return (
    <div>
      <Table services={services} />
    </div>
  );
}