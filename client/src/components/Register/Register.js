import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import * as validations from "./validations/validations";
import * as service from "../../services/userServices";
import styles from "./styles/register.module.css";
import background from "./images/backgr.jpg"

const Register = () => {
    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "",
        password: "",
        rePass: ""
    });

    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        imageUrl: false,
        rePass: false
    });

    const chnageHandler = (ev) => {
        ev.preventDefault();

        setData(state => ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    }

    const submitHandler = (ev, userData) => {
        ev.preventDefault();

        if (userData.password !== userData.rePass) {
            alert("Invalid data provided!");
        } else {
            try {
                const emailRegExp = new RegExp('^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+.[a-zA-Z]{2})$');
                if (emailRegExp.test(userData.email)) {
                    service.registerUser(userData)
                        .then(result => {
                            if (typeof result !== "string") {
                                userLogin(result);
                                navigate("/", { replace: true });
                            } else {
                                alert("User with this name already exists!");
                            }
                        });
                }
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <>
            <img className={styles["register-background-img"]} src={background} alt="background" />
            <section className={styles["register-page"]}>
                <ul className={styles["info-list"]}>
                    <li>Register users information</li>
                    <li>
                        Fill in the registration form with your personal details,
                        such as your name, email address, and a chosen password.
                    </li>
                    <li>
                        Verify your email address, if required. Some websites/apps will send you a
                        verification email to confirm your registration. Click on the link provided in
                        the email to verify your email address.
                    </li>
                    <li>
                        Click on the "Submit" or "Register" button to complete the registration process.
                    </li>
                    <li>
                        Start using the website/app! Once you have completed the registration process,
                        you should be able to log in and start using the features of the website/app.
                    </li>
                </ul>
                <form
                    className={styles["register"]}
                    onSubmit={(ev) => submitHandler(ev, data)}
                >
                    <h1 className={styles["register-heading"]}>Register new users</h1>
                    <p className={styles["register-info"]}>
                        Hey, enter your details to get your new account.
                    </p>
                    <article className={styles["user-info"]}>
                        <h4>User Information</h4>
                        <label htmlFor="firstName">First Name:</label>
                        <div>
                            <input
                                className={styles["email"]}
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name..."
                                value={data.firstName}
                                required
                                onChange={(ev) => chnageHandler(ev)}
                                onBlur={() => validations.minLength(3, data.firstName, "firstName", setError)}
                            />
                            {error.firstName &&
                                <p className={styles["form-error"]}>First name should be at least 3 characters long!</p>
                            }
                        </div>

                        <label htmlFor="lastName">Last Name:</label>
                        <div>
                            <input
                                className={styles["email"]}
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name..."
                                value={data.lastName}
                                required
                                onChange={(ev) => chnageHandler(ev)}
                                onBlur={() => validations.minLength(3, data.lastName, "lastName", setError)}
                            />
                            {error.lastName &&
                                <p className={styles["form-error"]}>First name should be at least 3 characters long!</p>
                            }
                        </div>

                        <label htmlFor="email">Email:</label>
                        <div>
                            <input
                                className={styles["email"]}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email..."
                                value={data.email}
                                required
                                onChange={(ev) => chnageHandler(ev)}
                                onBlur={() =>
                                    // eslint-disable-next-line
                                    validations.regexValidator("^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$", data.email, "email", setError)}
                            />
                            {error.email &&
                                <p className={styles["form-error"]}>Email is not valid!</p>
                            }
                        </div>

                        <label htmlFor="imageUrl">ImageUrl:</label>
                        <div>
                            <input
                                className={styles["email"]}
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                placeholder="https://..."
                                value={data.imageUrl}
                                required
                                onChange={(ev) => chnageHandler(ev)}
                                onBlur={() =>
                                    // eslint-disable-next-line
                                    validations.urlValidator("https://", data.imageUrl, "imageUrl", setError)}
                            />
                            {error.imageUrl &&
                                <p className={styles["form-error"]}>URL address should start with https://...!</p>
                            }
                        </div>

                        <label htmlFor="password">Password:</label>
                        <div className={styles["password-container"]}>
                            <input
                                className={styles["password"]}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password..."
                                value={data.password}
                                required
                                onChange={(ev) => chnageHandler(ev)}
                            />
                        </div>

                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <div className={styles["password-container"]}>
                            <input
                                className={styles["password"]}
                                type="password"
                                id="confirm-password"
                                name="rePass"
                                placeholder="Confirm your password..."
                                value={data.rePass}
                                required
                                onChange={(ev) => chnageHandler(ev)}
                                onBlur={() =>
                                    validations.passwordsMatch(data.password, data.rePass, "rePass", setError)}
                            />
                            {error.rePass &&
                                <p className={styles["form-error"]}>Passwords do not match!</p>
                            }
                        </div>
                        <p>
                            Already registered? <Link to="/login" replace>Log in</Link>
                        </p>
                        <input className={styles["btn-register"]} type="submit" value={"Register"} />
                    </article>
                </form>
            </section>
        </>
    );
};

export default Register;