import Layout from "../components/Layout";
import { MyHead } from "../components/MyHead";
import { ProfileForm } from "../components/ProfileForm";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";

const ProfilePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === null) {
      Router.push("/");
    }
  }, [user]);

  return (
    <React.Fragment>
      {user != null && (
        <Layout>
          <MyHead title="ユーザーページ" />
          <ProfileForm user={user} />
        </Layout>
      )}
    </React.Fragment>
  );
};

export default ProfilePage;
