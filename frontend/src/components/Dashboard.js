import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { myContext } from "../Context";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

function Dashboard() {
  const [markings, setMarkings] = useState([]);
  const user = useContext(myContext);
  const googleId = user.googleId;
  useEffect(() => {
    // async function getMarkings() {
    axios
      .post("/marking", {
        googleId: googleId,
      })
      .then((res) => {
        // console.log(res);
        setMarkings(res.data);
      });
    // }
  }, [googleId]);

  async function deleteMarking(id) {
    // console.log(id);
    await axios.delete(
      `/marking/${id}`
    );

    setMarkings(markings.filter((el) => el._id !== id));
  }

  return (
    <Container className="mt-5">
      <h3>Your content</h3>
      <Table className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {markings.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/public/${data._id}`}> {data.title}</Link>
                </td>
                <td>
                  <BsTrash
                    style={{ color: "blue" }}
                    type="button"
                    onClick={() => {
                      deleteMarking(data._id);
                    }}
                  />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
