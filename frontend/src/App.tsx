import { Outlet } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import './firebase-message.ts';

function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
