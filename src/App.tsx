import { Header, Layout, Main } from "./containers";
import { DataProvider } from "./providers";

const App = () => (
  <DataProvider>
    <Layout>
      <Header />
      <Main />
    </Layout>
  </DataProvider>
);

export default App;
