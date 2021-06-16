import Head from "next/head";

type MyHeadProps = {
  title?: string;
};

export const MyHead = ({
  title = "Default Title",
}: MyHeadProps): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};
