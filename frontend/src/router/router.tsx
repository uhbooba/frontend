import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Main from '@/pages/Main';
import DepositMission from '@/pages/Deposit_Mission';
import Savings from '@/pages/Savings';
import DepositExplain from '@/pages/Deposit_explain';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Main /> },
      { path: 'deposit', element: <DepositMission /> },
      { path: 'savings', element: <Savings /> },
      { path: 'explain', element: <DepositExplain /> },
    ],
  },
]);

export default router;
