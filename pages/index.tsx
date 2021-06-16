import Link from "next/link";
import Layout from "../components/Layout";
import { css } from "@emotion/react";
import { Button } from "@material-ui/core";
import { HomeHeader } from "../components/HomeHeader";
import React from "react";

const color = "white";

const IndexPage = (): JSX.Element => {
  // <Layout title="Home | Next.js + TypeScript Example">
  //   <h1>Hello Next.js 👋</h1>
  //   <div
  //     css={css`
  //       padding: 32px;
  //       background-color: hotpink;
  //       font-size: 24px;
  //       border-radius: 4px;
  //       &:hover {
  //         color: ${color};
  //       }
  //     `}
  //   >
  //     Hover to change color.
  //   </div>
  //   <Button variant="contained">Hello World</Button>
  //   <p>
  //     <Link href="/about">
  //       <a>About</a>
  //     </Link>
  //   </p>
  // </Layout>
  return (
    <React.Fragment>
      <HomeHeader />
      <h1>Hello Next.js 👋</h1>
      <div
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color.
      </div>
      <Button variant="contained">Hello World</Button>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </React.Fragment>
  )
  
};

export default IndexPage;
