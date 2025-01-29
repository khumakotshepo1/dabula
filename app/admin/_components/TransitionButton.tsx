import { Button } from "@/components/ui/button";
import { activeIndexAtom } from "@/utils/jotai";
import { useAtomValue, useSetAtom } from "jotai";

export function TransitionButton({ idx, children }: { idx: number, children: React.ReactNode }) {
  const setActiveIndex = useSetAtom(activeIndexAtom);
  const activeIndex = useAtomValue(activeIndexAtom);

  return (
    <Button
      variant="secondary"
      onClick={
        () => {
          setActiveIndex(idx)
        }
      }
      className={`rounded-md px-3 py-1 text-sm font-medium transition-all transform hover:scale-105 ${activeIndex !== idx && 'bg-background dark:bg-background text-auroraGreen-700 dark:text-auroraGreen-300 hover:text-snowStorm-100 dark:hover:text-snowStorm-100'}`}
    >
      {children}
    </Button>

  )
}
