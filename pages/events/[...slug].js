import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

function FilteredEventsPage() {
  const router = useRouter();
  const [ loadedEvents, setLoadedEvents ] = useState();

  const filterData = router.query.slug;                         // IMPORTANT: "useRouter - router" works such that it runs when the page first renderedand, it doesn't have the path parameter values at this point
                                                                // it than runs again and has access to them thereafter but not at the beginning
  useEffect(() => {
    getAllEvents().then(
      (eventsData) => {
        setLoadedEvents(eventsData);
      }
    )
  }, []);

  let pageHeadData = (                                           // You can add Head element as JSX code, like here below:
    <Head>                                                       {/* between the tags of this special "Head" element you can really add any HTML element that would normally go into the Head Section */}
      <title>Filtered Events</title>                             {/* we can use dynamic values*/}
      <meta
        name="description"                                       // this is a special tag - this matters to search engines. The "description" text will show up as a search result 
        content="A list of filtered events"                      // when this page showing up in e.g. a Google Search
      />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}                                           {/* Head element added as JSX code*/}
        <h1 className="center">Loading...</h1>
      </>
    );
  }
  
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // convert string to number
  const numMonth = +filteredMonth; // convert string to number

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}           // added Head elemet again here because of values of "numMonth" and "numYear" initially are empty/null
      />
    </Head>
  );

  if (isNaN(numYear) ||
  isNaN(numMonth) ||
  numYear > 2030 ||
  numYear < 2021 ||
  numMonth < 1 ||
  numMonth > 12) {
    return (
      <>
        {pageHeadData}                                           {/* Head element added as JSX code*/}
        <ErrorAlert>
          <p>Invalid filter! Please, adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}                                           {/* Head element added as JSX code*/}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}                                             {/* Head element added as JSX code*/}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

/*
  // SERVER-SIDE RENDERING ("getServerSideProps()") TOGETHER WITH CLIENT-SIDE DATA FETCHING HAS NO SENSE, BECAUSE "getServerSideProps()" IS RE-EXECUTED AFTER EVERY REQUEST
  // CLIENT-SIDE DATA FETCHING AND "getStaticProps()" TOGETHER MAKES SENSE, BECAUSE CLIENT-SIDE DATA FETCHING IS JUST UPDATEING THE PRERENDERED STATIC PAGE
  // "getServerSideProps()" IS RENDERING THE PAGE ON SERVER IN REAL-TIME - CLIENT-SIDE DATA FETCHING IS ALSO UPDATEING IN REAL-TIME, AT THE MOMENT OF EXECUTION OF QUERY
  // ("getServerSideProps()" ONLY MAKES SENSE IF YOU NEED TO LOOK INTO HEADERS, OR SIMILAR SITUATIONS, BUT NOT LIKE ABOVE!)

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // convert string to number
  const numMonth = +filteredMonth; // convert string to number

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      }
      // notFound: true,             // an alternative way
      // redirect: {                 // an alternative way
      //   destination: '/error';
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      }
    }
  };
}
*/

export default FilteredEventsPage;
