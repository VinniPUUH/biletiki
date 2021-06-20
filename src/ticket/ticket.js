import "./ticket.css";

const TicketFooterItem = ({ title, text }) => {
  return (
    <div className="ticket__footer__item">
      <span className="ticket__footer__item__title"> {title}</span>
      <span className="ticket__footer__item__text"> {text}</span>
    </div>
  );
};

const Ticket = ({ dataObj }) => {
  const segments = dataObj.segments;
  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket__header__price">{dataObj.price}</div>
        <div className="ticket__header__logo">
          <img src={`http://pics.avs.io/99/36/${dataObj.carrier}.png`} alt="" />
        </div>
      </div>

      <div className="ticket__footer">
        <div className="ticket__footer__column">
          {segments.map((segment, ind) => {
            return (
              <TicketFooterItem
                key={ind}
                title={`${segment.origin} - ${segment.destination}`}
                text={segment.date}
              ></TicketFooterItem>
            );
          })}
        </div>
        <div className="ticket__footer__column">
          {segments.map((segment, ind) => {
            return (
              <TicketFooterItem
                key={ind}
                title={"В пути"}
                text={segment.duration}
              ></TicketFooterItem>
            );
          })}
        </div>
        <div className="ticket__footer__column">
          {segments.map((segment, ind) => {
            return (
              <TicketFooterItem
                key={ind}
                title={`${segment.stops.length} пересадки`}
                text={segment.stops.join(", ")}
              ></TicketFooterItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
