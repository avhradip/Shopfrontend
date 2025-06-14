import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

export default function LogoutDialog({ handleLogOut }) {
    return (
        <Dialog>
            <DialogTrigger className="border bg-black text-white text-xs px-3 py-1 rounded-md">
                Log out
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-lg text-center">Are you sure you want to log out?</DialogTitle>
                </DialogHeader>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={handleLogOut}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded"
                    >
                        Yes, Log out
                    </button>
                    <DialogClose asChild>
                        <button className="bg-gray-200 hover:bg-gray-300 text-xs px-4 py-1 rounded">
                            No, Cancel
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
