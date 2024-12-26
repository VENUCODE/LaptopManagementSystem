import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Overview from "./components/OverView";
import ManageLaptops from "./components/Manage";
import AddLaptop from "./components/Manage/AddLaptop";
import ListLaptop from "./components/Manage/ListLaptop";
import AssignLaptop from "./components/Assign";
import Reports from "./components/Reports";
import Logs from "./components/Logs";

function App() {
  return (
    <div className="custom-bg  m-0 p-0">
      <Header />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/assign" element={<AssignLaptop />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/Logs" element={<Logs />} />
        <Route path="/manage" element={<ManageLaptops />}>
          <Route index element={<ListLaptop />} />
          <Route path="list" element={<ListLaptop />} />
          <Route path="add" element={<AddLaptop />} />
        </Route>
      </Routes>

      <footer className="text-center text-gray-400 dark:text-gray-600 p-4">
        Footer content
      </footer>
    </div>
  );
}

export default App;
