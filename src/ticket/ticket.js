import "./ticket.css";

const TicketFooterItem = ({ title, text }) => {
  return (
    <div className="ticket__footer__item">
      <span className="ticket__footer__item__title"> {title}</span>
      <span className="ticket__footer__item__text"> {text}</span>
    </div>
  );
};

//NOTE можно было рендерить билет не по колонкам, а по строкам
const Ticket = ({ dataObj }) => {
  const segments = dataObj.segments;
  const IMG_URL = `http://pics.avs.io/99/36/${dataObj.carrier}.png`;
  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket__header__price">{dataObj.price}</div>
        <div className="ticket__header__logo">
          <img src={IMG_URL} alt="Логотип компании-перевозчика" />
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
              />
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
              />
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
