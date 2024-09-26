import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '@/App';

const Main = lazy(() => import('@/pages/Main'));
const Education = lazy(() => import('@/pages/Education'));
const Savings = lazy(() => import('@/pages/savings/Savings_Explain'));
const DepositMission = lazy(() => import('@/pages/deposit/Deposit_Mission'));
const DepositExplain = lazy(() => import('@/pages/deposit/Deposit_Explain'));
const DepositSignup = lazy(() => import('@/pages/deposit/Deposit_Signup'));
const DepositAgree = lazy(() => import('@/pages/deposit/Deposit_Agree'));
const DepositMoney = lazy(() => import('@/pages/deposit/Deposit_Money'));
const DepositProduct = lazy(() => import('@/pages/deposit/Deposit_Product'));
const DepositAccount = lazy(() => import('@/pages/deposit/Deposit_Account'));
const DepositPassword = lazy(() => import('@/pages/deposit/Deposit_Password'));
const DepositSuccess = lazy(() => import('@/pages/deposit/Deposit_Success'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const CancelDepositExplain = lazy(
  () => import('@/pages/depositCancel/Cancel_Deposit_Explain'),
);
const CancelDepositProduct = lazy(
  () => import('@/pages/depositCancel/Cancel_Deposit_Product'),
);
const CancelDepositPassword = lazy(
  () => import('@/pages/depositCancel/Cancel_Deposit_Password'),
);
const CancelDepositSuccess = lazy(
  () => import('@/pages/depositCancel/Cancel_Deposit_Success'),
);
const CancelSavingsExplain = lazy(
  () => import('@/pages/savingsCancel/Cancel_savings_Explain'),
);
const CancelSavingsProduct = lazy(
  () => import('@/pages/savingsCancel/Cancel_savings_Product'),
);
const CancelSavingsPassword = lazy(
  () => import('@/pages/savingsCancel/Cancel_savings_Password'),
);
const CancelSavingsSuccess = lazy(
  () => import('@/pages/savingsCancel/Cancel_savings_Success'),
);
const SavingsAgree = lazy(() => import('@/pages/savings/Savings_Agree'));
const SavingsMoney = lazy(() => import('@/pages/savings/Savings_Money'));
const SavingsAccount = lazy(() => import('@/pages/savings/Savings_Account'));
const SavingsSignup = lazy(() => import('@/pages/savings/Savings_Signup'));
const SavingsProduct = lazy(() => import('@/pages/savings/Savings_Product'));
const SavingsPassword = lazy(() => import('@/pages/savings/Savings_Password'));
const SavingsSuccess = lazy(() => import('@/pages/savings/Savings_Success'));
const DepositSuccess2 = lazy(() => import('@/pages/deposit/Deposit_Success2'));
const EducationVideo = lazy(
  () => import('@/pages/education/video/Education_Video'),
);
const EducationCertificate = lazy(
  () => import('@/pages/education/certificate/Education_Certificate'),
);
const QuizMain = lazy(() => import('@/pages/quiz/QuizMain'));
const QuizQuestion = lazy(() => import('@/pages/quiz/QuizQuestion'));
const QuizSuccess = lazy(() => import('@/pages/quiz/QuizSuccess'));
const EducationWriting = lazy(
  () => import('@/pages/education/certificate/Education_Writing'),
);
const EducationDownload = lazy(
  () => import('@/pages/education/certificate/Education_Download'),
);
const ExchangeAgree = lazy(() => import('@/pages/exchange/ExchangeAgree'));
const ExchangeMoney = lazy(() => import('@/pages/exchange/ExchangeMoney'));
const ExchangePassword = lazy(
  () => import('@/pages/exchange/ExchangePassword'),
);
const ExchangeComplete = lazy(
  () => import('@/pages/exchange/ExchangeComplete'),
);
const ExchangeSuccess = lazy(() => import('@/pages/exchange/ExchangeSuccess'));
const ExchangeMission = lazy(() => import('@/pages/exchange/ExchangeMission'));
const ExchangeExplain = lazy(() => import('@/pages/exchange/ExchangeExplain'));
const UtilityPayInfoInput = lazy(
  () => import('@/pages/utilityPayment/UtilityPayInfoInput'),
);
const UtilityPayMission = lazy(
  () => import('@/pages/utilityPayment/UtilityPayMission'),
);
const UtilityPayScan = lazy(
  () => import('@/pages/utilityPayment/UtilityPayScan'),
);
const UtilityPayMoney = lazy(
  () => import('@/pages/utilityPayment/UtilityPayMoney'),
);
const UtilityPayPassword = lazy(
  () => import('@/pages/utilityPayment/UtilityPayPassword'),
);
const UtilityPayExplain = lazy(
  () => import('@/pages/utilityPayment/UtilityPayExplain'),
);
const UtilityPaySuccess = lazy(
  () => import('@/pages/utilityPayment/UtilityPaySuccess'),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      { path: '', element: <Main /> },
      { path: 'study', element: <Education /> },
      { path: 'deposit', element: <DepositMission /> },
      { path: 'savings', element: <Savings /> },
      { path: 'explain', element: <DepositExplain /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      // 예금
      { path: 'deposit/explain', element: <DepositExplain /> },
      { path: 'deposit/signup', element: <DepositSignup /> },
      { path: 'deposit/agree', element: <DepositAgree /> },
      { path: 'deposit/money', element: <DepositMoney /> },
      { path: 'deposit/account', element: <DepositAccount /> },
      { path: 'deposit/product', element: <DepositProduct /> },
      { path: 'deposit/password', element: <DepositPassword /> },
      { path: 'deposit/success', element: <DepositSuccess /> },
      { path: 'deposit/success2', element: <DepositSuccess2 /> },
      // 적금
      { path: 'savings/agree', element: <SavingsAgree /> },
      { path: 'savings/signup', element: <SavingsSignup /> },
      { path: 'savings/money', element: <SavingsMoney /> },
      { path: 'savings/account', element: <SavingsAccount /> },
      { path: 'savings/product', element: <SavingsProduct /> },
      { path: 'savings/password', element: <SavingsPassword /> },
      { path: 'savings/success', element: <SavingsSuccess /> },
      // 예금 중도해지
      { path: 'cancel/deposit/explain', element: <CancelDepositExplain /> },
      { path: 'cancel/deposit/product', element: <CancelDepositProduct /> },
      { path: 'cancel/deposit/password', element: <CancelDepositPassword /> },
      { path: 'cancel/deposit/success', element: <CancelDepositSuccess /> },
      // 적금 중도해지
      { path: 'cancel/savings/explain', element: <CancelSavingsExplain /> },
      { path: 'cancel/savings/product', element: <CancelSavingsProduct /> },
      { path: 'cancel/savings/password', element: <CancelSavingsPassword /> },
      { path: 'cancel/savings/success', element: <CancelSavingsSuccess /> },
      // 교육 영상
      { path: 'education/video', element: <EducationVideo /> },
      // 이수증
      { path: 'education/certificate', element: <EducationCertificate /> },
      { path: 'education/writing', element: <EducationWriting /> },
      { path: 'education/download', element: <EducationDownload /> },
      // 퀴즈
      { path: 'quiz', element: <QuizMain /> },
      { path: 'quiz/:type', element: <QuizQuestion /> },
      { path: 'quiz/:type/success', element: <QuizSuccess /> },
      // 환전
      { path: 'exchange/mission', element: <ExchangeMission /> },
      { path: 'exchange/explain', element: <ExchangeExplain /> },
      { path: 'exchange/agree', element: <ExchangeAgree /> },
      { path: 'exchange/money', element: <ExchangeMoney /> },
      { path: 'exchange/password', element: <ExchangePassword /> },
      { path: 'exchange/complete', element: <ExchangeComplete /> },
      { path: 'exchange/success', element: <ExchangeSuccess /> },
      // 공과금 납부
      { path: 'utility/mission', element: <UtilityPayMission /> },
      { path: 'utility/explain', element: <UtilityPayExplain /> },
      { path: 'utility/input', element: <UtilityPayInfoInput /> },
      { path: 'utility/scan', element: <UtilityPayScan /> },
      { path: 'utility/money', element: <UtilityPayMoney /> },
      { path: 'utility/password', element: <UtilityPayPassword /> },
      { path: 'utility/success', element: <UtilityPaySuccess /> },
    ],
  },
]);

export default router;
