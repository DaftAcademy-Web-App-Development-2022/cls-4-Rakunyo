import React from "react";

import { Form, User } from "../index";
import styles from "./Sidebar.module.css";

import userData from "~/data/userData.json";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const handleLogout = (name: string, id: string) => {
    console.log("logout", name, id);
  };

  const { data } = useSession();

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <User
          logout={() => handleLogout(userData.name, userData.id)}
          email={data?.user?.email || ""}
          name={data?.user?.name || ""}
          image={data?.user?.image || ""}
          loading={!data}
        />
      </div>
      <div className={styles.center}>
        <Form />
      </div>
    </div>
  );
};

export default Sidebar;
