"use client";

import { TypographyH1, TypographyP } from "@/components/typography";
import { CustomerCard } from "./CustomerCard";
import { TransitionPanel } from "@/components/transition-panel";
import { TransitionButton } from "./TransitionButton";
import { useAtomValue } from "jotai";
import { activeIndexAtom } from "@/utils/jotai";
import Image from "next/image";

export function CustomerView({ customer }: { customer: CustomerPropType }) {
  const activeIndex = useAtomValue(activeIndexAtom);
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          src={customer.image === null ? `https://api.dicebear.com/9.x/pixel-art/webp?seed=${customer.first_name}` : customer.image}
          alt={customer.first_name}
          width={100}
          height={100}
        />
        <div>
          <TypographyH1>{customer.first_name} {customer.last_name}</TypographyH1>
          <TypographyP>#{customer.user_id}</TypographyP>
        </div>
      </div>

      <div className='mb-4 flex items-center justify-center gap-3 p-3'>
        <TransitionButton idx={0}>
          Customer Info
        </TransitionButton>

        <TransitionButton idx={1}>
          Rewards
        </TransitionButton>

        <TransitionButton idx={2}>
          Quarts
        </TransitionButton>

        <TransitionButton idx={3}>
          Redemptions
        </TransitionButton>

      </div>

      <div className='overflow-hidden border-t border-lightBorder dark:border-darkBorder'>
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          variants={{
            enter: { opacity: 0, y: -50, filter: 'blur(4px)' },
            center: { opacity: 1, y: 0, filter: 'blur(0px)' },
            exit: { opacity: 0, y: 50, filter: 'blur(4px)' },
          }}
        >

          <div key={0} className='flex flex-col gap-6'>
            <CustomerCard title={"Personal Details"}>
              <TypographyP>Employee ID Number: {customer.identity_number}</TypographyP>
              <TypographyP className="capitalize">Names: {customer.first_name} {customer.last_name}</TypographyP>
            </CustomerCard>

            <CustomerCard title={"Contact Details"}>
              <TypographyP>Email: {customer.email}</TypographyP>
              <TypographyP>Phone: {customer.phone}</TypographyP>
            </CustomerCard>

          </div>

          <div key={1} className='flex flex-col gap-6'>

          </div>

          <div key={2} className='flex flex-col gap-6'>

          </div>

          <div key={3} className='flex flex-col gap-6'>

          </div>

        </TransitionPanel>
      </div >
    </div >
  );
}
