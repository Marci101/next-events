export async function getAllEvents() {
  return fetch(
    "https://react-getting-started-91fcc-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  )
  .then((response) => response.json())
  .then((data) => {
    const transformedEvents = [];

    for (const key in data) {
      transformedEvents.push({
        id: key,
        ...data[key],
      })
    }

    return transformedEvents;
  });
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}