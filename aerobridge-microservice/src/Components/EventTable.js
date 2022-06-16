import React from 'react'
import { Container, Row, Table } from "react-bootstrap"
import ReturnArrow from './ReturnArrow'

const EventTable = (props) => {
  return (
    <Container>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((c) => (
                <tr key={c.componentHistoryId}>
                    <td>{c.status}</td>
                    <td>{c.description} <a href={`/search/${c.aircraftAID}`}>{c.aircraftAID}</a></td>
                    <td>{c.eventDate}</td>
                </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default EventTable