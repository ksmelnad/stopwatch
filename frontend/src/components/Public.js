import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function Public() {
  const [markings, setMarkings] = useState([]);

  useEffect(() => {
    // async function getMarkings() {
    axios
      .get("/public")
      .then((res) => {
        // console.log(res);
        setMarkings(res.data);
      });
    // }
  }, []);

  return (
    <>
      <Container className="mt-5">
        <h3>Public</h3>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created by</th>
            </tr>
          </thead>
          <tbody>
            {markings.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/public/${data._id}`}> {data.title}</Link>
                  </td>
                  <td>{data.username}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Public;
