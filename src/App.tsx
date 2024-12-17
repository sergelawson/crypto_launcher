import Root from "./routes/Root";
import { Routes, Route } from "react-router";

const App = () => (
  <Routes>
    <Route path="/" element={<Root />} />
  </Routes>
);

export default App;
