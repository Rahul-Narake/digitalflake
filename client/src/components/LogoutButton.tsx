import { Dialoge } from './Dialoge';
import { CircleUserRound, UserRoundPen } from 'lucide-react';
import LogoutForm from './LogoutForm';

function LogoutButton() {
  return (
    <Dialoge
      buttonText={<CircleUserRound className="text-white" size={34} />}
      children={<LogoutForm />}
    />
  );
}

export default LogoutButton;
