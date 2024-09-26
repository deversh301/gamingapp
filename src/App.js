import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import Menu from "./components/Menu";
import BoardView from "./components/Board";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Container>
          <Col>
            <Routes>
              <Route path="/" element={<BoardView />} />
            </Routes>
          </Col>
        </Container>
      </div>
    </Router>
  );
}

export default App;
