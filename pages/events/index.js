import { useRouter } from "next/router";
import Head from 'next/head';
import { getAllEvents } from '../../helpers/api-util';
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventsSearch";

function AllEventsPage(props) {
  const router = useRouter();

  function findSearchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>                                          {/* between the tags of this special "Head" element you can really add any HTML element that would normally go into the Head Section */}
        <title>All Events</title>
        <meta
          name="description"                          // this is a special tag - this matters to search engines. The "description" text will show up as a search result 
          content="Find a lot of great events..."     // when this page showing up in e.g. a Google Search
        />
      </Head>
      <EventSearch onSearch={findSearchHandler} />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
