import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function Show() {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const params = useParams();
  // console.log("Marking content: ", marking.content);

  useEffect(() => {
    async function getData() {
      const id = params.id.toString();
      const response = await axios.post(
        `/marking/${id}`,
        {
          id: id,
        }
      );
      setContent(response.data.content);
      setTitle(response.data.title);
    }
    getData();
  }, [params.id]);

  return (
    <>
      <Container className="mt-5">
        <h3>{title}</h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Begin</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {content.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data[0]}</td>
                  <td>{data[1]}</td>
                  <td>{data[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Show;
