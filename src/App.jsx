import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from './components/common/Toast';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <Provider store={store}>
      <ProductsPage />
      <ToastContainer />
    </Provider>
  );
}

export default App;
