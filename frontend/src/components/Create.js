import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import "./Create.css";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate } from "react-router-dom";

function Create() {
  const user = useContext(myContext);
  const req_googleId = user.googleId;
  const username = user.username;
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);
  const [rowsData, setRowsData] = useState([]);
  const [start, setStart] = useState();
  const [begin, setBegin] = useState(0);
  const [startBtn, setStartBtn] = useState(false);
  const [markBtn, setMarkBtn] = useState(true);
  const [stopBtn, setStopBtn] = useState(true);
  const [resetBtn, setResetBtn] = useState(true);
  const navigate = useNavigate();

  const startHandler = () => {
    setStart(new Date().getTime());
    setMarkBtn(false);
    setStartBtn(true);
  };

  const markHandler = () => {
    setCount(count + 1);
    let now = new Date().getTime();
    let end = (now - start) / 1000;

    const rowsInput = [count, begin, end];
    setRowsData([...rowsData, rowsInput]);
    setBegin(end);
    setStopBtn(false);
  };

  const stopHandler = () => {
    setCount(0);
    setStart();
    setMarkBtn(true);
    setResetBtn(false);
    setStopBtn(true);
    console.log("rowsData: ", JSON.stringify(rowsData, null, 2));
  };

  const resetHandler = () => {
    setRowsData([]);
    setCount(1);
    setBegin(0);
    setStartBtn(false);
    setResetBtn(true);
  };

  const TableRow = () => {
    return rowsData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data[0]}</td>
          <td>{data[1]}</td>
          <td>{data[2]}</td>
        </tr>
      );
    });
  };

  async function onSubmit(e) {
    e.preventDefault();
    await axios.post("/marking/add", {
      title: title,
      content: rowsData,
      googleId: req_googleId,
      username: username,
    });
    navigate("/dashboard");
  }

  return (
    <Container>
      <Form className="mt-3" onSubmit={onSubmit}>
        <Row>
          <Col className="col-9">
            <Form.Control
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Col>
          <Col className="col-3">
            <Button variant="light" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Container className="col-md-12 mx-auto">
        <Table className="table-head">
          <thead>
            <tr>
              <th>#</th>
              <th>Begin</th>
              <th>End</th>
            </tr>
          </thead>
        </Table>
      </Container>
      <Container className="col-md-12 mx-auto">
        <Table className="table-css">
          <tbody>
            <TableRow />
          </tbody>
        </Table>
      </Container>
      <Container className="fixed-bottom mb-3 ">
        <Button variant="success" onClick={startHandler} disabled={startBtn}>
          Start
        </Button>

        <Button variant="primary" onClick={markHandler} disabled={markBtn}>
          Mark
        </Button>

        <Button variant="warning" onClick={stopHandler} disabled={stopBtn}>
          Stop
        </Button>

        <Button variant="danger" onClick={resetHandler} disabled={resetBtn}>
          Reset
        </Button>
      </Container>
    </Container>
  );
}

export default Create;
