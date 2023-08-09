import EventItem from './EventItem';
import classes from './EventList.module.css';

function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;