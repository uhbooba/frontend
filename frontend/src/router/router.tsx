import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Main from '@/pages/Main';
import Education from '@/pages/Education';
import Savings from '@/pages/savings/Savings_Explain';
import DepositMission from '@/pages/deposit/Deposit_Mission';
import DepositExplain from '@/pages/deposit/Deposit_Explain';
import DepositSignup from '@/pages/deposit/Deposit_Signup';
import DepositAgree from '@/pages/deposit/Deposit_Agree';
import DepositMoney from '@/pages/deposit/Deposit_Money';
import DepositProduct from '@/pages/deposit/Deposit_Product';
import DepositAccount from '@/pages/deposit/Deposit_Account';
import DepositPassword from '@/pages/deposit/Deposit_Password';
import DepositSuccess from '@/pages/deposit/Deposit_Success';
import CancelDepositExplain from '@/pages/depositCancel/Cancel_Deposit_Explain';
import CancelDepositProduct from '@/pages/depositCancel/Cancel_Deposit_Product';
import CancelDepositPassword from '@/pages/depositCancel/Cancel_Deposit_Password';
import CancelDepositSuccess from '@/pages/depositCancel/Cancel_Deposit_Success';
import CancelSavingsExplain from '@/pages/savingsCancel/Cancel_savings_Explain';
import CancelSavingsProduct from '@/pages/savingsCancel/Cancel_savings_Product';
import CancelSavingsPassword from '@/pages/savingsCancel/Cancel_savings_Password';
import CancelSavingsSuccess from '@/pages/savingsCancel/Cancel_savings_Success';
import SavingsAgree from '@/pages/savings/Savings_Agree';
import SavingsMoney from '@/pages/savings/Savings_Money';
import SavingsAccount from '@/pages/savings/Savings_Account';
import SavingsSignup from '@/pages/savings/Savings_Signup';
import SavingsProduct from '@/pages/savings/Savings_Product';
import Savingspassword from '@/pages/savings/Savings_Password';
import SavingsSuccess from '@/pages/savings/Savings_Success';
import DepositSuccess2 from '@/pages/deposit/Deposit_Success2';
import AccountCheck from '@/pages/account/AccountCheck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'study', element: <Education /> },
      { path: 'deposit', element: <DepositMission /> },
      { path: 'savings', element: <Savings /> },
      { path: 'deposit/explain', element: <DepositExplain /> },
      { path: 'deposit/signup', element: <DepositSignup /> },
      { path: 'deposit/agree', element: <DepositAgree /> },
      { path: 'deposit/money', element: <DepositMoney /> },
      { path: 'deposit/account', element: <DepositAccount /> },
      { path: 'deposit/product', element: <DepositProduct /> },
      { path: 'deposit/password', element: <DepositPassword /> },
      { path: 'deposit/success', element: <DepositSuccess /> },
      { path: 'account/check', element: <AccountCheck /> },
    ],
  },
]);

export default router;
