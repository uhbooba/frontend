import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '@/App';

const Main = lazy(() => import('@/pages/Main'));
const Education = lazy(() => import('@/pages/Education'));
const DepositMission = lazy(() => import('@/pages/deposit/DepositMission'));
const DepositExplain = lazy(() => import('@/pages/deposit/DepositExplain'));
const DepositSignup = lazy(() => import('@/pages/deposit/DepositSignup'));
const DepositAgree = lazy(() => import('@/pages/deposit/DepositAgree'));
const DepositMoney = lazy(() => import('@/pages/deposit/DepositMoney'));
const DepositProduct = lazy(() => import('@/pages/deposit/DepositProduct'));
const DepositAccount = lazy(() => import('@/pages/deposit/DepositAccount'));
const DepositPassword = lazy(() => import('@/pages/deposit/DepositPassword'));
const DepositSuccess = lazy(() => import('@/pages/deposit/DepositSuccess'));
const DepositSuccess2 = lazy(() => import('@/pages/deposit/DepositSuccess2'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const CancelDepositExplain = lazy(
  () => import('@/pages/depositCancel/CancelDepositExplain'),
);
const CancelDepositProduct = lazy(
  () => import('@/pages/depositCancel/CancelDepositProduct'),
);
const CancelDepositPassword = lazy(
  () => import('@/pages/depositCancel/CancelDepositPassword'),
);
const CancelDepositSuccess = lazy(
  () => import('@/pages/depositCancel/CancelDepositSuccess'),
);
const CancelSavingsExplain = lazy(
  () => import('@/pages/savingsCancel/CancelSavingsExplain'),
);
const CancelSavingsProduct = lazy(
  () => import('@/pages/savingsCancel/CancelSavingsProduct'),
);
const CancelSavingsPassword = lazy(
  () => import('@/pages/savingsCancel/CancelSavingsPassword'),
);
const CancelSavingsSuccess = lazy(
  () => import('@/pages/savingsCancel/CancelSavingsSuccess'),
);
const SavingsExplain = lazy(() => import('@/pages/savings/SavingsExplain'));
const SavingsAgree = lazy(() => import('@/pages/savings/SavingsAgree'));
const SavingsMoney = lazy(() => import('@/pages/savings/SavingsMoney'));
const SavingsAccount = lazy(() => import('@/pages/savings/SavingsAccount'));
const SavingsSignup = lazy(() => import('@/pages/savings/savingsSignup'));
const SavingsProduct = lazy(() => import('@/pages/savings/SavingsProduct'));
const SavingsPassword = lazy(() => import('@/pages/savings/SavingsPassword'));
const SavingsSuccess = lazy(() => import('@/pages/savings/SavingsSuccess'));
const EducationVideo = lazy(
  () => import('@/pages/education/video/EducationVideoHard'),
);
const EducationVideo2 = lazy(
  () => import('@/pages/education/video/EducationVideo'),
);
const EducationCertificate = lazy(
  () => import('@/pages/education/certificate/EducationCertificate'),
);
const QuizMain = lazy(() => import('@/pages/quiz/QuizMain'));
const QuizQuestion = lazy(() => import('@/pages/quiz/QuizQuestion'));
const QuizSuccess = lazy(() => import('@/pages/quiz/QuizSuccess'));
const EducationWriting = lazy(
  () => import('@/pages/education/certificate/EducationCertificateWriting'),
);
const EducationDownload = lazy(
  () => import('@/pages/education/certificate/EducationCertificateDownload'),
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

const AccountCheck = lazy(() => import('@/pages/account/AccountCheck'));
const AccountAddCash = lazy(() => import('@/pages/account/AccountAddCash'));
const AccountProductsList = lazy(
  () => import('@/pages/account/AccountProductsList'),
);
const AccountDepositProducts = lazy(
  () => import('@/pages/account/AccountDepositProducts'),
);
const AccountTransferAccountInfo = lazy(
  () => import('@/pages/account/AccountTransferAccountInfo'),
);
const AccountTransferAmount = lazy(
  () => import('@/pages/account/AccountTransferAmount'),
);
const AccountTransferDepositName = lazy(
  () => import('@/pages/account/AccountTransferDepositName'),
);
const AccountTransferInfoCheck = lazy(
  () => import('@/pages/account/AccountTransferInfoCheck'),
);
const AccountTransferPassword = lazy(
  () => import('@/pages/account/AccountTransferPassword'),
);
const AccountTransferSuccess = lazy(
  () => import('@/pages/account/AccountTransferSuccess'),
);
const AccountList = lazy(() => import('@/pages/account/AccountList'));

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
      { path: 'education', element: <Education /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      // 예금
      { path: 'deposit', element: <DepositMission /> },
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
      { path: 'savings', element: <SavingsExplain /> },
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
      // 금융 교육 영상
      { path: 'education/video/hard', element: <EducationVideo /> },
      { path: 'education/video', element: <EducationVideo2 /> },
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
      // 계좌 조회
      { path: 'account/list', element: <AccountList /> },
      { path: 'account/check', element: <AccountCheck /> },
      { path: 'account/add-cash', element: <AccountAddCash /> },
      // 계좌 생성
      { path: 'account/products', element: <AccountProductsList /> },
      { path: 'account/products/deposit', element: <AccountDepositProducts /> },
      // 계좌 이체
      {
        path: 'account/transfer/account-info',
        element: <AccountTransferAccountInfo />,
      },
      { path: 'account/transfer/amount', element: <AccountTransferAmount /> },
      {
        path: 'account/transfer/deposit-name',
        element: <AccountTransferDepositName />,
      },
      {
        path: 'account/transfer/info-check',
        element: <AccountTransferInfoCheck />,
      },
      {
        path: 'account/transfer/password',
        element: <AccountTransferPassword />,
      },
      { path: 'account/transfer/success', element: <AccountTransferSuccess /> },
    ],
  },
]);

export default router;
