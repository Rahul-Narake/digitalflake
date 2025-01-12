import { Dialoge } from './Dialoge';
import { UserRoundPen } from 'lucide-react';
import LogoutForm from './LogoutForm';

function LogoutButton() {
  return (
    <div>
      <Dialoge
        buttonText={<UserRoundPen color="black" />}
        children={<LogoutForm />}
      />
    </div>
  );
}

export default LogoutButton;
