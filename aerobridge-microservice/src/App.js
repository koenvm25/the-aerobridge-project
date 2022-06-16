import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivatePage from "./Pages/AerobridgeId/PrivatePage";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <Router>
      <Container>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:aerobridgeId" element={<PrivatePage/>} />
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
