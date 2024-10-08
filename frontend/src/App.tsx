import { Outlet } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { BottomTab } from './components/layouts/BottomTab';
import ScrollToTop from './components/layouts/ScrollTopTop';

function App() {
  const isBottomTab = ['/intro'].includes(location.pathname);

  return (
    <div>
      <Layout>
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </Layout>
      {!isBottomTab && <BottomTab />}
    </div>
  );
}

export default App;
