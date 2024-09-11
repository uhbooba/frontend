import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Main from '@/pages/Main';
import Savings from '@/pages/savings/Savings';
import DepositMission from '@/pages/deposit/Deposit_Mission';
import DepositExplain from '@/pages/deposit/Deposit_Explain';
import DepositSignup from '@/pages/deposit/Deposit_Signup';
import DepositSignup2 from '@/pages/deposit/Deposit_Signup2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'deposit', element: <DepositMission /> },
      { path: 'savings', element: <Savings /> },
      { path: 'explain', element: <DepositExplain /> },
      { path: 'deposit/signup', element: <DepositSignup /> },
      { path: 'deposit/signup2', element: <DepositSignup2 /> },
    ],
  },
]);

export default router;
