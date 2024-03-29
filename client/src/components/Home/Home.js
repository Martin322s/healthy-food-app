import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/UserContext";
import RecipeItem from "./RecipeItem";

import styles from "./styles/home.module.css";
import resp from "./styles/responsive.module.css";
import salmon from "./images/salmon.png";
import background from "./images/backgr.jpg";

const Home = () => {
    const [lastThree, setLastThree] = useState([]);
    const { getAllRecipes } = useContext(AuthContext);

    useEffect(() => {
        getAllRecipes()
            .then(result => {
                if (result !== 'Failed to fetch') {
                    setLastThree(result?.slice(-3)?.reverse());
                } else {
                    setLastThree([]);
                }
            });
    }, [getAllRecipes]);

    return (
        <>
            <div className={`${styles["home-section"]} ${resp["home-section"]}`}>
                <img className={`${styles["background-img"]} ${resp["background-img"]}`} src={background} alt="background" />
                <article className={`${styles["heading-info"]} ${resp["heading-info"]}`}>
                    <h1 className={`${styles["heading"]} ${resp["heading"]}`}>NutriGit: Wholesome &amp; Tasty Meals for Your Body and Soul</h1>
                    <p className={`${styles["heading-para"]} ${resp["heading-para"]}`}>
                        At NutriChef, we believe that food should be both wholesome and tasty.
                        Our recipes are designed to nourish your body and soul, while also tantalizing
                        your taste buds. We use only the freshest ingredients, and our recipes are designed
                        to be easy to follow, even if you're not an experienced cook.
                    </p>
                    <Link className={`${styles["heading-link"]} ${resp["heading-link"]}`} to="/catalog-recipes">
                        Recipes Catalog
                    </Link>
                    <div className={`${styles["header-empty"]} ${resp["header-empty"]}`} />
                </article>
            </div>
            <section className={`${styles["info"]} ${resp["info"]}`}>
            </section>
            <section className={`${styles["about-food"]} ${resp["about-food"]}`}>
                <img className={`${styles["salmon-fish"]} ${resp["salmon-fish"]}`} src={salmon} alt="salmon" />
                <article>
                    <h4 className={`${styles["about-heading"]} ${resp["about-heading"]}`}>About</h4>
                    <h1 className={`${styles["food-heading"]} ${resp["food-heading"]}`}>
                        Food is An Important Part Of A Balance Diet
                    </h1>
                    <p className={`${styles["food-information"]} ${resp["food-information"]}`}>
                        A balanced diet contains differing kinds of foods in certain quantities
                        and proportions so that the requirement for calories, proteins,
                        minerals, vitamins and alternative nutrients is adequate and a small
                        provision is reserved for additional nutrients to endure the short
                        length of leanness.
                    </p>
                    <Link
                        className={`${styles["about-link"]} ${resp["about-link"]}`}
                        to="https://www.relainstitute.com/blog/balanced-diet-importance-of-a-balanced-diet/"
                        target="_blank"
                    >
                        Learn more
                    </Link>
                </article>
            </section>
            <h2 className={styles["last-recipes-heading"]}>The last 3 added recipes...</h2>
            <section className={`${styles["last-recipes"]} ${resp["last-recipes"]}`}>
                {
                    lastThree?.length > 0
                        ?
                        lastThree?.map(x => <RecipeItem key={x._id} {...x} />)
                        :
                        <h1 className={`${resp["no-recipes"]}`}>There are no recipes created yet.</h1>
                }
            </section>
        </>
    );
}

export default Home;