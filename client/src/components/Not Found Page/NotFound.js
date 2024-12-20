import { memo } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/notFound.module.css";
import oops from "./images/oops.png";

const NotFound = memo(() => {
  return (
    <section className={styles["not-found-page"]}>
      <div>
        <img className={styles["error-img"]} src={oops} alt="oops" />
        <h1 className={styles["error-heading"]}>404 - PAGE NOT FOUND</h1>
        <p className={styles["error-info"]}>
          The page you are looking for might have been removed, had its name
          changed or is temporary unavailable!
        </p>
        <div className={styles["link-container"]}>
          <Link className={styles["error-link"]} to="/">
            GO TO HOMEPAGE
          </Link>
        </div>
      </div>
    </section>
  );
});

export default NotFound;
