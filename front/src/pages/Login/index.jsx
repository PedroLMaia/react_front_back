import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles.module.scss';


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erros, setErros] = useState({dadosInvalidos:''});
    const history = useHistory();

    async function handleLogin (e){
        e.preventDefault();

        if (!email) return;
        if (!password) return;
        //NOVO PROCESSO DE LOGIN
        await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email, password })
            .then( (res) => {
                const { data: { user } } = res;
                
                localStorage.setItem('@db/nickname', user.nickname)
                localStorage.setItem('@db/user_id', user._id)
                history.push('/home')
            }).catch(err => {
            // msg de erro
        })
    }

    function handleDirectCadastro(){
        history.push("/Cadastro")
    }

    return (
        <div className={styles.container} >
            <form onSubmit={handleLogin} className={styles.formContainer} >
            

                <section>
                    <input
                        type="email" 
                        required
                        placeholder="escreva seu e-mail"
                        onChange={(v) => setEmail(v.target.value)}
                    />
                </section>

                <section>
                    <input
                        type="password" 
                        required
                        placeholder="escreva sua senha:"
                        onChange={(v) => setPassword(v.target.value)}
                    />
                </section>
            </form>

            <section className={styles.submitBtn}>
                <button onClick={handleLogin} >Fazer login</button>
                <button onClick={handleDirectCadastro} >Cadastre-se</button>
            </section>
        </div>
    );
}