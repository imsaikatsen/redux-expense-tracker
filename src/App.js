import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transaction from "./components/Transactions/Transactions";

function App() {
  return (
    <Layout>
      <Balance />
      <Form />
      <Transaction />
    </Layout>
  );
}

export default App;
