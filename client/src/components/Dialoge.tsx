import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

export function Dialoge({
  buttonText,
  children,
}: {
  buttonText: string | React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogClose />
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText ? buttonText : 'Profile'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
