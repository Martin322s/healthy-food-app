import styles from "./styles/createRecipe.module.css";
import background from "./images/backgr.jpg";
import { Link } from "react-router-dom";

const CreateRecipe = () => {
    return (
        <>
            <section className={styles["create-page"]}>
                <article className={styles["info"]}>
                    <ul className={styles["steps"]}>
                        <li>Create recipe information:</li>
                        <li>The title specifies the name of the recipe.</li>
                        <li>
                            Ingredients list: A list of all the ingredients required for the recipe.
                            NOTE: Every ingredient must be on the new line!
                        </li>
                        <li>
                            Preparation: Step-by-step instructions on how to prepare the recipe.
                        </li>
                        <li>
                            Category - specifies the type of the recipe - Appetizers, Soups and
                            stews, Salads, Main dishes, Side dishes, Desserts, Beverages and ect.
                        </li>
                    </ul>
                </article>
                <form className={styles["create"]}>
                    <h1 className={styles["create-heading"]}>Create Recipes</h1>
                    <div className="links">
                        <Link className={styles["create-recipe"]} to="/create-recipes" replace>
                            Create Recipe
                        </Link>
                        <Link className={styles["create-product"]} to="/create-products" replace>
                            Create Product
                        </Link>
                    </div>
                    <label htmlFor="title">Title:</label>
                    <div>
                        <input type="text" id="title" name="title" placeholder="Title..."/>
                    </div>
                    <label htmlFor="category">Category:</label>
                    <div>
                        <input type="text" id="category" name="category" placeholder="Main dish...."/>
                    </div>
                    <label htmlFor="imageUrl">Image Url:</label>
                    <div>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="https://..."/>
                    </div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <div>
                        <textarea
                            cols={20}
                            rows={5}
                            id="ingredients"
                            name="ingredients"
                            defaultValue={""}
                            placeholder="1/2 teaspoon salt..."
                        />
                    </div>
                    <label htmlFor="preparation">Preparation:</label>
                    <div>
                        <textarea
                            cols={20}
                            rows={5}
                            id="preparation"
                            name="preparation"
                            defaultValue={""}
                            placeholder="Cooking preparation..."
                        />
                    </div>
                    <div>
                        <input
                            className={styles["create-btn"]}
                            type="submit"
                            value={"Create recipe"}
                        />
                    </div>
                </form>
                <img className={styles["background-img"]} src={background} alt="background" />
            </section>
        </>
    );
}

export default CreateRecipe;