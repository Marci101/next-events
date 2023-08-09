import Head from "next/head"; //  that's a special component which you can add anywhere in your JSX code for a given component!

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/EventList";

function HomePage(props) {
  return (
    <div>
      <Head>                                          {/* between the tags of this special "Head" element you can really add any HTML element that would normally go into the Head Section */}
        <title>NextJS Events</title>
        <meta
          name="description"                          // this is a special tag - this matters to search engines. The "description" text will show up as a search result 
          content="Find a lot of great events..."     // when this page showing up in e.g. a Google Search
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // in every half hour we regenerate this page for a new incoming request
  };
}

export default HomePage;
