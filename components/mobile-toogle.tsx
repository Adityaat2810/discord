import { Ghost, Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { NavigationSideBar } from "./navigation/navigation-sidebar"
import ServerSideBar from "./server/server-sidebar"

export const MobileToogel =({serverId}:{
    serverId:string
})=>{
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon"
                className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" 
            className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSideBar/>
                </div>
                <ServerSideBar serverId={serverId}/>
            </SheetContent>
        </Sheet>
    )
}