import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles.module.scss';


export function AtualizarCadastro() {

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erros, setErros] = useState({ dadosInvalidos: '' });
    const history = useHistory();

    async function handleCadastro(e) {
        e.preventDefault();

        if (!nickname) return;
        if (!email) return;
        if (!password) return;

        const newUser = {
            nickname: nickname,
            email: email,
            password: password

        }

        await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${id}`, newUser)
            .then((res) => {
                localStorage.clear()
                history.push('/')
            })
    }

    function handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        history.push("/")
    }

    const user = JSON.parse(localStorage.getItem('@db/nickname'))

    useEffect(() => {
        if (!user) history.push("/");

        setNickname(user.nickname)
        setEmail(user.email)
        setPassword(user.password)
        setId(user.id)
    }, [])

    return (
        <div className={styles.container} >
            <form className={styles.formContainer} >

                <section>
                    <input
                        type="text"
                        required
                        placeholder="escreva seu nickname:"
                        onChange={(v) => setNickname(v.target.value)}
                        value={nickname}
                    />
                </section>

                <section>
                    <input
                        type="email"
                        required
                        placeholder="escreva seu e-mail:"
                        onChange={(v) => setEmail(v.target.value)}
                        value={email}
                    />
                </section>

                <section>
                    <input
                        type="password"
                        required
                        placeholder="escreva sua senha:"
                        onChange={(v) => setPassword(v.target.value)}
                        value={password}
                    />
                </section>
            </form>

            <section className={styles.buttons}>
                <button onClick={handleCadastro} >Cadastrar</button>
                <button onClick={handleLogout} >Logout</button>
            </section>
        </div>
    );
}