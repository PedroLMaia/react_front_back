import React, {useState, useEffect} from 'react';

import styles from "./styles.module.scss"

export function UserEdit() {
    const [username, setUsername] = useState();
    const [outroDado, setOutroDado] = useState();

    useEffect(() => {
        const localStrgUsername = localStorage.getItem('@spotify');

        setUsername(localStrgUsername);
    }, []);


    return (
        <div className={styles.container} >
            <form >
                <section>
                    <label>Username: </label>
                    <input
                        value={username}
                        onChange={(v) => setUsername(v.target.value)}
                    />
                </section>

                <section>
                    <label>OutraCoisa: </label>
                    <input
                        value={outroDado}
                        onChange={(v) => setOutroDado(v.target.value)}
                    />
                </section>
            </form>
        </div>
    );
};