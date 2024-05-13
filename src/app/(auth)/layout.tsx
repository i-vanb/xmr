import {ReactNode} from "react";
import {Toaster} from "@/components/ui/sonner";
import {Card} from "@/components/ui/card";

export default async function DashboardLayout({children}: {
  children: ReactNode
}) {
  return (
    <div className="absolute h-screen w-full inset-0 flex items-center justify-center bg-background">
      <div className="rounded-md">
        <Card className="px-4 py-6">
          {children}
        </Card>
      </div>
      <Toaster richColors={true}/>
    </div>
  )
}