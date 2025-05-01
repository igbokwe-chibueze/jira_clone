// src/hooks/use-confirm.tsx
import { ComponentProps, JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
 } from "@/components/ui/card";


type ButtonProps = ComponentProps<typeof Button>;

 export const useConfirm = (
    title: string,
    message: string,
    variant: ButtonProps["variant"] = "primary",
 ): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean)=> void } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        })
    }

    const handleClose = () => {
        setPromise(null);
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog = () => (
        <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="pt-8">
                    <CardHeader className="pt-0">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>

                    <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                        <Button variant="outline" onClick={handleCancel} 
                            className="w-full lg:w-auto"
                        >
                            Cancel
                        </Button>

                        <Button variant={variant} onClick={handleConfirm}
                            className="w-full lg:w-auto"
                        >
                            Confirm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </ResponsiveModal>
    );

    return [ConfirmationDialog, confirm];
}