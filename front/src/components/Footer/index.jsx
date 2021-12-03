import React, { useState, useEffect } from 'react';
import "./css/Footer.css"

//retorna true se o mês dado não começa com 0.
function formataMesData(mes){
    if(String(mes).charAt(0) != 0){
        console.log("N tem 0 no começo")
        return true;
    }
        
    return false;
}

export function Footer() {
    const [dataAtual, setDataAtual] = useState(0);

    useEffect(() => {
        let dataCorrente = new Date();
        let dia = dataCorrente.getDate()
        let mes = dataCorrente.getMonth() + 1
        let ano = dataCorrente.getFullYear()

        let mesFormatado = formataMesData(mes) ? "0" + String(mes) : mes

        let dataFormatada =  dia +  "/" + mesFormatado + "/" + ano
        
        document.getElementById("dataAtual").innerText = "Data atual do sistema: " + dataFormatada

    });
  return (
    <div className="Footer">
         <footer>
        
        <table>
            <tr>
                <th><img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" id="logo"/></th>
                <th>EMPRESA</th>
                <th>COMUNIDADES</th>
                <th>LINKS ÚTEIS</th>
            </tr>
            <tr>
                <td></td>
                <td>Sobre</td>
                <td>Para Artistas</td>
                <td>Suporte</td>
            </tr>
            <tr>
                <td></td>
                <td>Empregos</td>
                <td>Desenvolvedores</td>
                <td>Player da Web</td>
            </tr>
            <tr>
                <td></td>
                <td>For the Record</td>
                <td>Publicidade</td>
                <td>Aplicativo móvel grátis</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>Investidores</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>Fornecedores</td>
                <td></td>
            </tr>
        </table>
        <div id="dataAtual"></div>
    </footer>

    </div>
  );
}
