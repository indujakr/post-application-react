import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from './Common/Header'
import Store from "./Store/Store";
function App() {
  return (
    <Store>
      <div className="App">
        <Header/>
        <Dashboard />
      </div>
    </Store>
  );
}

export default App;
