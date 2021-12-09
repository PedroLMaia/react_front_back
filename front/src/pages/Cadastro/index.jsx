import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles.module.scss';


export function Cadastro() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erros, setErros] = useState({dadosInvalidos:''});
    const history = useHistory();

    async function handleCadastro (e){
        e.preventDefault();
        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/users`,
            
        {
            nickname: nickname,
            email: email,
            password: password
              
        })
            .then( (res) => {
                // localStorage.setItem('@db/user', JSON.stringify({id: }))
                localStorage.setItem('@db/user_id',  res.data.id)
                localStorage.setItem('@db/nickname',  res.data.nickname)
                history.push('/home')
            })
    }


    return (
        <div className={styles.container} >
            <form className={styles.formContainer} >

                <section>
                    <input
                        type="text"
                        required
                        placeholder="escreva seu nickname:"
                        onChange={(v) => setNickname(v.target.value)}
                    />
                </section>

                <section>
                    <input
                        type="email"
                        required
                        placeholder="escreva seu e-mail:"
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

            <button onClick={handleCadastro} >Cadastrar</button>
        </div>
    );
}