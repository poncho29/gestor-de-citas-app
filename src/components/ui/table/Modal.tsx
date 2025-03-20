import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                {children}
            </DialogContent>
        </Dialog>
    )
}
