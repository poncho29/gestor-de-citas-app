import { getServices } from "@/actions/services/getServices-action";
import { SimplifiedService } from "@/interfaces/services.interfaces";
import Table from "./components/Table";

export default async function Page() {

  const limit = 10;
  const offset = 0;

  const response = await getServices(limit, offset);

  const services: SimplifiedService[] = Array.isArray(response?.services) ? response.services : [];
  const totalServices: number = response?.total || 0;

  return (
    <div>
      <Table initialServices={services} totalServices={totalServices} />
    </div>
  );
}