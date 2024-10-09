import { Outlet, useLocation } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import './firebase-message.ts';
import { BottomTab } from './components/layouts/BottomTab';
import ScrollToTop from './components/layouts/ScrollTopTop';

function App() {
  const location = useLocation();
  const isBottomTab =
    ['/'].includes(location.pathname) ||
    /\/education(\/.*)?/.test(location.pathname);

  return (
    <div>
      <Layout>
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </Layout>
      {isBottomTab && <BottomTab />}
    </div>
  );
}

export default App;
