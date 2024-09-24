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
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
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
import SavingsSignup from '@/pages/savings/savings_Signup';
import SavingsProduct from '@/pages/savings/Savings_Product';
import Savingspassword from '@/pages/savings/Savings_Password';
import SavingsSuccess from '@/pages/savings/Savings_Success';
import DepositSuccess2 from '@/pages/deposit/Deposit_Success2';
import EducationVideo from '@/pages/education/video/Education_Video';
import EducationCertificate from '@/pages/education/certificate/Education_Certificate';
import QuizMain from '@/pages/quiz/QuizMain';
import QuizQuestion from '@/pages/quiz/QuizQuestion';
import QuizSuccess from '@/pages/quiz/QuizSuccess';
import EducationWriting from '@/pages/education/certificate/Education_Writing';
import EducationDownload from '@/pages/education/certificate/Education_Download';
import AccountCheck from '@/pages/account/AccountCheck';
import AccountTransferAccountInfo from '@/pages/account/AccountTransferAccountInfo'
import AccountTransferAmount from '@/pages/account/AccountTransferAmount';
import AccountTransferDepositName from '@/pages/account/AccountTransferDepositName';
import AccountTransferInfoCheck from '@/pages/account/AccountTransferInfoCheck';
import AccountTransferPassword from '@/pages/account/AccountTransferPassword';
import AccountTransferSuccess from '@/pages/account/AccountTransferSuccess';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'study', element: <Education /> },
      { path: 'deposit', element: <DepositMission /> },
      { path: 'savings', element: <Savings /> },
      { path: 'explain', element: <DepositExplain /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'deposit/explain', element: <DepositExplain /> },
      { path: 'deposit/signup', element: <DepositSignup /> },
      { path: 'deposit/agree', element: <DepositAgree /> },
      { path: 'deposit/money', element: <DepositMoney /> },
      { path: 'deposit/account', element: <DepositAccount /> },
      { path: 'deposit/product', element: <DepositProduct /> },
      { path: 'deposit/password', element: <DepositPassword /> },
      { path: 'deposit/success', element: <DepositSuccess /> },
      { path: 'deposit/success2', element: <DepositSuccess2 /> },
      { path: 'savings/agree', element: <SavingsAgree /> },
      { path: 'savings/signup', element: <SavingsSignup /> },
      { path: 'savings/money', element: <SavingsMoney /> },
      { path: 'savings/account', element: <SavingsAccount /> },
      { path: 'savings/product', element: <SavingsProduct /> },
      { path: 'savings/password', element: <Savingspassword /> },
      { path: 'savings/success', element: <SavingsSuccess /> },
      { path: 'cancel/deposit/explain', element: <CancelDepositExplain /> },
      { path: 'cancel/deposit/product', element: <CancelDepositProduct /> },
      { path: 'cancel/deposit/password', element: <CancelDepositPassword /> },
      { path: 'cancel/deposit/success', element: <CancelDepositSuccess /> },
      { path: 'cancel/savings/explain', element: <CancelSavingsExplain /> },
      { path: 'cancel/savings/product', element: <CancelSavingsProduct /> },
      { path: 'cancel/savings/password', element: <CancelSavingsPassword /> },
      { path: 'cancel/savings/success', element: <CancelSavingsSuccess /> },
      { path: 'education/video', element: <EducationVideo /> },
      { path: 'education/certificate', element: <EducationCertificate /> },
      { path: 'education/writing', element: <EducationWriting /> },
      { path: 'education/download', element: <EducationDownload /> },
      { path: 'quiz', element: <QuizMain /> },
      { path: 'quiz/:type', element: <QuizQuestion /> },
      { path: 'quiz/:type/success', element: <QuizSuccess /> },
      { path: 'account/check', element: <AccountCheck /> },
      { path: 'account/transfer/account-info', element: <AccountTransferAccountInfo /> },
      { path: 'account/transfer/amount', element: <AccountTransferAmount /> },
      { path: 'account/transfer/deposit-name', element: <AccountTransferDepositName /> },
      { path: 'account/transfer/info-check', element: <AccountTransferInfoCheck /> },
      { path: 'account/transfer/password', element: <AccountTransferPassword /> },
      { path: 'account/transfer/success', element: <AccountTransferSuccess /> },
    ],
  },
]);

export default router;
