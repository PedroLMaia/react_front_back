import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { useAlert } from 'react-alert'
import { UserComponent } from '../../service/users';
import { useHistory } from "react-router-dom";

export function FormularioComponent() {
    const history = useHistory();
  
    const handleRoute = (e) =>{ 
        e.preventDefault()
        const name = e.target.elements.nickname.value;
        localStorage.setItem('@db/nickname', name)
        alert.success("Usuário cadastrado com sucesso!")
        
      history.push("/");
    }

    const alert = useAlert()
    const [isFormValid, setisFormValid] = useState(false);
    const [validInputs, setValidInputs] = useState(0)

    const [anoAtual, setAnoAtual] = useState(0);
    

    
    function validateEmail(e){
        
        let email = e.target.value
    
        let regexEmail =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (!regexEmail.test(email))
        {
            alert.show('Insira um e-mail válido!')
            document.getElementById("emailInput").style.borderColor = "red"
            setisFormValid(false)
        }else{
            document.getElementById("emailInput").style.borderColor = "green"
            setisFormValid(true)
            console.log(isFormValid)

        }
    }



    function validateEmailConfirmation(e){
        let email = document.getElementById("emailInput").value
        let emailConfirmation = e.target.value

        if(email != emailConfirmation){
            alert.show('Você deve informar e-mails iguais!')
            document.getElementById("emailConfirmInput").style.borderColor = "red"
            setisFormValid(false)
        }else{
            document.getElementById("emailConfirmInput").style.borderColor = "green"

            setisFormValid(true)
            console.log(isFormValid)
        }

    }

    useEffect(() => {
        setAnoAtual(new Date().getFullYear())

    });
  return (
    <div className={styles.container}>
        <form onSubmit={handleRoute}>
            <input type="text" minLength="3" onBlur={(e) => validateEmail(e)} id="emailInput" name="email" placeholder="E-mail" required/><br/>
            <input type="text" id="emailConfirmInput" onBlur={(e) => validateEmailConfirmation(e)} name="emailConfirm" placeholder="Confirmar e-mail" required/><br/>
            <input type="password" id="passwordInput" name="password" placeholder="Senha" required/><br/>
            <input type="text" id="nicknameInput" name="nickname" placeholder="Como devemos chamar você?" required/><br/>
            <label>Data de nascimento</label><br/>
            <input type="number" id="diaInput" name="dia" min="0" max="31" placeholder="Dia" required></input>
            <select name="mes" id="mesSelect" required>
                <option defaultValue="" disabled selected>Mês</option>
                <option defaultValue="volvo">Janeiro</option>
                <option defaultValue="saab">Fevereiro</option>
                <option defaultValue="mercedes">Março</option>
                <option defaultValue="audi">Abril</option>
                <option defaultValue="volvo">Maio</option>
                <option defaultValue="saab">Junho</option>
                <option defaultValue="mercedes">Julho'</option>
                <option defaultValue="audi">Agosto</option>
                <option defaultValue="saab">Setembro</option>
                <option defaultValue="mercedes">Outrubro</option>
                <option defaultValue="audi">Novembro</option>
                <option defaultValue="audi">Dezembro</option>
            </select>
            <input type="number" id="anoInput" name="ano" min="0" max={anoAtual} placeholder="Ano" required></input><br/>
            <input type="radio" id="mascGeneroInput" name="genero" value="Masculino"></input>
            <label for="age1">Masculino</label>
            <input type="radio" id="femGeneroInput" name="genero" value="Feminino"></input>
            <label for="age1">Feminino</label>
            <input type="radio" id="binGeneroInput" name="genero" value="Nao binario"></input>
            <label for="age1">Não binario</label><br/>
            <button disabled={!isFormValid} type="submit" id="emailInput" >Inscrever-se</button>
        </form>
    </div>
  );
}
