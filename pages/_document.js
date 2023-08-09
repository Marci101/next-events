import Document, { Html, Head, Main, NextScript } from 'next/document';

// this file ("_document.js") is allow us to customize the entire HTML document structure - so all the elements that make up an HTML document.

/*class MyDocument extends Document {
  render() {
    return (
      <Html>                   {/* this is the default (NextJS) HTML document structure what we use normally if we don't want to overwrite or extend it *//*}
        <Head>                 {/* note that this is not that kind of "Head" element here what we used inside the PAGE components *//*}
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}*/

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">                {/* we extend here the default HTML document structure with a "lang" property */}
        <Head>                        {/* note that this is not that kind of "Head" element here what we used inside the PAGE components */}
          <body>
            <div id="overlays" />     {/* we can add other element to the document structure like this one. This allows us to add HTML content outside of our application component tree - sometimes its useful */}
            <Main />                  {/* the NextJS appication is rendered inside this "Main" element */}
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;