import ConnectWallet from "./components/ConnectWallet";
import "./App.css";
import BuyDyno from "./components/BuyDyno";
import { HomePage } from "./components/sample";
function App() {
  return (
    <>
    <HomePage/>
      <ConnectWallet />
      <BuyDyno />
    </>
  );
}

export default App;
