import { CustomerView } from "@/app/admin/_components/CustomerView";
import { getCustomerById } from "@/server/users.server";

type Params = Promise<{ customerSlug: string }>;

export default async function CustomerViewPage(props: { params: Params }) {
  const params = await props.params;

  const customerSlug = params.customerSlug;

  const customer = await getCustomerById(parseInt(customerSlug)) as CustomerPropType;

  console.log({ customer })

  return (
    <div>
      <CustomerView customer={customer} />
    </div>
  );
}

