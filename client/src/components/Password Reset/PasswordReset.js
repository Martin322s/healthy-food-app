import { memo, useCallback, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import resp from "./styles/responsive.module.css";

import * as service from "../../services/userServices";
import { initData, reducer } from "./data/data";
import Error from "../Error/Error";

import styles from "./styles/password.module.css";

const PasswordReset = memo(() => {
    const [state, dispatch] = useReducer(reducer, initData);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showComponent, setShowComponent] = useState({
        title: "",
        show: false
    });

    const changeHandler = useCallback((ev) => {
        const { name, value } = ev.target;
        dispatch({ type: 'SET_FIELD', field: name, value });
    }, []);

    const passwordData = { password: state.password, rePass: state.rePass, userId: user._id };

    const submitHandler = (ev) => {
        ev.preventDefault();

        if (state.email !== "") {
            service.testForEmail({ email: state.email, secretWord: state.secretWord })
                .then(result => {
                    if (result.message) {
                        throw result;
                    } else {
                        setUser(result);
                    }
                })
                .catch(err => {
                    setShowComponent(() => ({
                        title: err.message,
                        show: true
                    }));
                    setTimeout(() => {
                        setShowComponent(() => ({
                            title: "",
                            show: false
                        }));
                    }, [3000]);
                });
        };

        if (user._id) {
            service.resetPassword(passwordData)
                .then(result => {
                    setShowComponent(() => ({
                        title: `${result.message} 
                        You will be redirected to the log in page.`,
                        show: true
                    }));
                    setTimeout(() => {
                        setShowComponent(() => ({
                            title: "",
                            show: false
                        }));
                    }, [3000])
                    setTimeout(() => {
                        navigate("/login", { replace: true });
                    }, 2700);
                });
        };
    };
    
    return (
        <>
            {showComponent.show &&
                <Error message={showComponent.title} />
            }
            <section className={`${styles["login-page"]} ${resp["login-page"]}`}>
                <form
                    className={`${styles["login"]} ${resp["login-responsive"]}`}
                    onSubmit={(ev) => submitHandler(ev, state)}
                >
                    <h1 className={styles["login-heading"]}>Reset your password</h1>
                    <p className={styles["login-info"]}>
                        Hey, create your new password and log in to your account again.
                    </p>
                    <article className={styles["user-info"]}>
                        <h4>New Password Information</h4>
                        <label htmlFor="email">Email:</label>
                        <div>
                            <input
                                className={styles["email"]}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email..."
                                required
                                value={state.email}
                                onChange={(ev) => changeHandler(ev)}
                            />
                        </div>
                        <label htmlFor="secret">Secret word:</label>
                        <div>
                            <input
                                className={styles["email"]}
                                type="text"
                                id="secret"
                                name="secretWord"
                                placeholder="Enter your secret word..."
                                required
                                value={state.secretWord}
                                onChange={(ev) => changeHandler(ev)}
                            />
                        </div>
                        {user._id
                            ?
                            <>
                                <label htmlFor="email">New Password:</label>
                                <div>
                                    <input
                                        className={styles["email"]}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your new password..."
                                        required
                                        value={state.password}
                                        onChange={(ev) => changeHandler(ev)}
                                    />
                                </div>
                                <label htmlFor="rePass">Confirm New Password:</label>
                                <div className={styles["password-container"]}>
                                    <input
                                        className={styles["password"]}
                                        type="password"
                                        id="rePass"
                                        name="rePass"
                                        placeholder="Confirm your new password..."
                                        required
                                        value={state.rePass}
                                        onChange={(ev) => changeHandler(ev)}
                                    />
                                </div>
                            </>
                            : null
                        }
                        <input
                            className={styles["btn-login"]}
                            type="submit"
                            value={user._id ? "Reset Password" : "Find user"}
                        />
                    </article>
                </form>
            </section>
        </>
    );
});

export default PasswordReset;