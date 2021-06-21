import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import "./App.css";

import Ticket from "./ticket/ticket";

function App() {
  const [tickets, setTickets] = useState([]);
  // let id;
  // NOTE можно избавиться от внешней переменной, просто прокидывая
  // найденный searchId в функцию поиска билетов getTickets

  // NOTE лучше сначала объявить функцию, а потом ее использовать, хотя
  // js и позволяет вольности :)
  const getTickets = useCallback((id) => {
    //NOTE иначе на каждый рендер у тебя будет создаваться новая функция
    /**
     * то есть если убрать useCallback, но при этом поставить getTickets в
     * зависимости useEffect'а, то у тебя будет создаваться "копия" данной функции,
     * но в новом месте памяти. А это значит, что новая функция не равна старой
     */
    axios
      .get("https://front-test.beta.aviasales.ru/tickets", {
        params: {
          searchId: id,
        },
      })
      .then((response) => {
        setTickets((prevState) => [...prevState, ...response.data.tickets]);
        // NOTE коротко-модно-молодежно) Плюс return не обязательно использовать в стрелочной
        // функции, когда просто она просто возвразает какое-то выражение
        // console.log(response.data.stop); -- NOTE можно посмотреть во вкладке Network
        if (!response.data.stop) {
          return getTickets(id);
        }
      })
      .catch((error) => {
        console.log(error);
        return getTickets(id);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://front-test.beta.aviasales.ru/search")
      .then((response) => {
        const id = response.data.searchId;
        // console.log(id); -- NOTE можно посмотреть во вкладке Network
        return id;
      })
      .then((id) => {
        getTickets(id);
      });
  }, [getTickets]); //NOTE warning в консоли браузера, что ты юзаешь функцию, но не кладешь ее в зависимости

  // console.log(tickets);

  return (
    <div className="App">
      {tickets.map((ticket, ind) => (
        <Ticket key={ind} dataObj={ticket} />
      ))}
    </div>
  );
}

export default App;
