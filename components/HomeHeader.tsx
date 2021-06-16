import { makeStyles } from '@material-ui/styles';

import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

const useStyle = makeStyles({
    homeHeader: {
        backgroundColor: "#fffff0"
    },
});

export const HomeHeader = (): JSX.Element => {
    const classes = useStyle();

    return (
        <React.Fragment>
            <Head>
                <title>{"Hack Us"}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header className={classes.homeHeader}>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>{" "}
                    |{" "}
                    <Link href="/about">
                        <a>About</a>
                    </Link>{" "}
                    |{" "}
                    <Link href="/users">
                        <a>Users List</a>
                    </Link>
                </nav>
            </header>
        </React.Fragment>
        
    );
};