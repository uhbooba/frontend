import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Main from '@/pages/Main';
import Savings from '@/pages/savings/Savings';
import DepositMission from '@/pages/deposit/Deposit_Mission';
import DepositExplain from '@/pages/deposit/Deposit_Explain';
import DepositSignup from '@/pages/deposit/Deposit_Signup';
import DepositAgree from '@/pages/deposit/Deposit_Agree';
import DepositMoney from '@/pages/deposit/Deposit_Money';
import DepositProduct from '@/pages/deposit/Deposit_Product';
import DepositAccount from '@/pages/deposit/Deposit_Account';
import DepositPassword from '@/pages/deposit/Deposit_Password';
import DepositSuccess from '@/pages/deposit/Deposit_Success';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'deposit', element: <DepositMission /> },
      { path: 'savings', element: <Savings /> },
      { path: 'explain', element: <DepositExplain /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'deposit/signup', element: <DepositSignup /> },
      { path: 'deposit/agree', element: <DepositAgree /> },
      { path: 'deposit/money', element: <DepositMoney /> },
      { path: 'deposit/account', element: <DepositAccount /> },
      { path: 'deposit/product', element: <DepositProduct /> },
      { path: 'deposit/password', element: <DepositPassword /> },
      { path: 'deposit/success', element: <DepositSuccess /> },
    ],
  },
]);

export default router;
