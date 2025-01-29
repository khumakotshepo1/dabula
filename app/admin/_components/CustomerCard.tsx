import { TypographyH3 } from "@/components/typography";

export function CustomerCard({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className='flex flex-col gap-2'>
        <TypographyH3 className="bg-background dark:bg-background w-4/5 mx-auto p-3 rounded-md">
          {title}
        </TypographyH3>
        <div className="flex flex-col gap-2 w-4/5 mx-auto p-3">
          {children}
        </div>
      </div>

    </div>
  )
}
