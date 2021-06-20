import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

import Ticket from "./ticket/ticket";

function App() {
  const [tickets, setTickets] = useState([]);
  let id;

  useEffect(() => {
    axios
      .get("https://front-test.beta.aviasales.ru/search")
      .then((response) => {
        id = response.data.searchId;
        console.log(id);
      })
      .then(() => {  getTickets();})
  }, []);

  const getTickets = () => {
    axios
      .get("https://front-test.beta.aviasales.ru/tickets", {
        params: {
          searchId: id,
        },
      })
      .then((response) => {
        setTickets((prevState) => {return prevState.concat([...response.data.tickets])});
        console.log(response.data.stop);
        if (!response.data.stop) {
          getTickets();
        }
      })
      .catch((error) => {
        console.log(error);
        getTickets();
      });
  };

  console.log(tickets);

  return (
    <div className="App">
      {tickets.map((ticket, ind) => {
        return <Ticket key={ind} dataObj={ticket}></Ticket>;
      })}
    </div>
  );
}

export default App;
