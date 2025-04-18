"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Sidebar } from "./sidebar";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

export const MobileSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      setIsOpen(false);
    }, [pathname])
    
    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button size={"icon"} variant={"secondary"} className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500"/>
                </Button>
            </SheetTrigger>

            <SheetContent side={"left"} 
                className="p-0"
                aria-label="Navigation Menu" 
            >
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}
