import { Fragment } from "react";
import Head from 'next/head';
import { getEventById, getFeaturedEvents } from "../../helpers/api-util"; 
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";

function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    return (
      <>
        <div className="center">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <Fragment>
      <Head>                                          {/* between the tags of this special "Head" element you can really add any HTML element that would normally go into the Head Section */}
        <title>{event.title}</title>                  {/* we can use dynamic values*/}
        <meta
          name="description"                          // this is a special tag - this matters to search engines. The "description" text will show up as a search result 
          content={event.description}                 // when this page showing up in e.g. a Google Search
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {  // "eventId" comes from the filename ("[eventId].js")
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 30,  // in every half minute we regenerate this page for a new incoming request
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const pathsWithParams = events.map((event) => ({ params: { eventId: event.id } }) );

  return {
    paths: pathsWithParams,  // mapped IDs ("loading dynamically" with mapping)
    /*paths: [
      { params: { eventId: 'e1'}},  // IDs given by "hand" - "eventId" comes from the "[eventId]" part of [eventId].js filename.
      { params: { eventId: 'e2'}},
      { params: { eventId: 'e3'}},
    ],*/
    fallback: true, // if "fallback" set to "true" (type: boolean), only those pages will be pre-rendered, which ID is provided  >>  "{ params: { eventId: 'e1'}}"
  };                 // the furthermore pages will be rendered in real-time, in an async manner, so we need to add some "waiting" to the process  >>  e.g.: "return <p>Loading...</p>"
}                    // "fallback" can be set to "blocking" (type: string) - with this you don't have to provide a "waiting" loader to the process, like above ((other parts of the page will seen, but the fetching part won't util it isn't loaded))
                     // if "fallback" set to "false" (type: boolean), only those pages will be pre-rendered, which ID is provided and than an invalid/unknown eventId will cause a "404" page.

export default EventDetailPage;
