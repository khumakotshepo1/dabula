"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import Link from "next/link";
import Image from "next/image"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export const CustomerColumns: ColumnDef<CustomerPropType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const first_name = row.getValue("first_name") as string;
      const image = row.getValue("image") as string;

      return (
        <Image
          src={image === null ? `https://api.dicebear.com/9.x/pixel-art/webp?seed=${first_name}` : image}
          alt={first_name}
          width={100}
          height={100}
          className="w-10 h-10 lg:w-16 lg:h-16 object-cover rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "identity_number",
    header: "Identity Number",
  },

  {
    id: "actions",
    cell: ({ row }) => {

      const customer = row.original;
      const customer_id = customer.user_id;

      const processForm = async () => {
        //const res = await deleteCruiseAction(employee_id);

        //if (res?.error) {
        //  toast.error(res.error);
        //}

        //if (res?.success) {
        //  toast.success(res.success);
        //}
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-background dark:bg-background p-3">

            <DropdownMenuItem>
              <Link
                className="text-auroraGreen-700 dark:text-auroraGreen-300"
                href={`/admin/customers/${customer_id}/view-customer`}>
                View
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                className="text-auroraYellow-700 dark:text-auroraYellow-300"
                href={`/admin/customers/${customer_id}/edit-customer`}>
                Edit
              </Link>
            </DropdownMenuItem>

            <form action={processForm}>
              <DropdownMenuItem>
                <button className="text-auroraRed-700 dark:text-auroraRed-300">Delete</button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>

        </DropdownMenu>
      );
    },
  },
];
