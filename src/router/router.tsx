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
import CancleDepositExplain from '@/pages/depositCancle/Cancle_Deposit_Explain';
import CancleDepositProduct from '@/pages/depositCancle/Cancle_Deposit_Product';
import CancleDepositPassword from '@/pages/depositCancle/Cancle_Deposit_Password';
import CancleDepositSuccess from '@/pages/depositCancle/Cancle_Deposit_Success';
import CancleSavingsExplain from '@/pages/savingCancle/Cancle_savings_Explain';
import CancleSavingsProduct from '@/pages/savingCancle/Cancle_savings_Product';
import CancleSavingsPassword from '@/pages/savingCancle/Cancle_savings_Password';
import CancleSavingsSuccess from '@/pages/savingCancle/Cancle_savings_Success';
import SavingsAgree from '@/pages/savings/Saving_Agree';
import SavingsSignup from '@/pages/savings/savings_Signup';


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
      { path: 'savings/agree', element: <SavingsAgree /> },
      { path: 'savings/signup', element: <SavingsSignup /> },
      { path: 'cancle/deposit/explain', element: <CancleDepositExplain /> },
      { path: 'cancle/deposit/product', element: <CancleDepositProduct /> },
      { path: 'cancle/deposit/password', element: <CancleDepositPassword /> },
      { path: 'cancle/deposit/success', element: <CancleDepositSuccess /> },
      { path: 'cancle/savings/explain', element: <CancleSavingsExplain /> },
      { path: 'cancle/savings/product', element: <CancleSavingsProduct /> },
      { path: 'cancle/savings/password', element: <CancleSavingsPassword /> },
      { path: 'cancle/savings/success', element: <CancleSavingsSuccess /> },
    ],
  },
]);

export default router;
