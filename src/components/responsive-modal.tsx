
import {useMedia} from 'react-use';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer'; 

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    title?: string;
    description?: string;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
    children,
    open,
    title,
    description,
    onOpenChange,
}: ResponsiveModalProps) => {
    const isDesktop = useMedia('(min-width: 1024px)', true);

    // Prepare accessible elements
    const Title = (
        <DialogTitle asChild>
            <span className='sr-only'>{title}</span>
        </DialogTitle>
    );  // :contentReference[oaicite:4]{index=4}

    const Description = description ? (
        <DialogDescription>
            {description}
        </DialogDescription>
    ) : null;  // :contentReference[oaicite:5]{index=5}

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    aria-describedby={description ? undefined : undefined}
                    className='w-full sm:max-w-lg p-0 border-none overflow-auto hide-scrollbar max-h-[85vh]'
                >
                    {Title}
                    {Description}
                    {children}
                </DialogContent>
            </Dialog>
        )
    
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className='overflow-auto hide-scrollbar max-h-[85vh]'>
                    {Title}
                    {Description}
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

