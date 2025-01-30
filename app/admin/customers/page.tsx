import { getCustomers } from "@/server/users.server";
import { CustomerColumns } from "../_components/CustomerColumns";
import { CustomersTable } from "../_components/CustomersTable";

export default async function CustomersPage() {
  const customers = await getCustomers() as CustomerPropType[];

  return (
    <>
      <CustomersTable data={customers} columns={CustomerColumns} />
    </>
  )
}
