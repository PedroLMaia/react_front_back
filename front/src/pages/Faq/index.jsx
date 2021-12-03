import React from 'react';
import { FaqItem } from '../../components/FaqItem';
import styles from "./styles.module.scss";

const faqObj = [
  {
    question: "Não me lembro das minhas informações de login.",
    answer: "Se você não se lembrar da sua senha, use a página de redefinição de senha. Se não se lembrar do seu e-mail/nome de usuário, acesse a página de redefinição de senha e insira os endereços de e-mail que você pode ter usado para criar uma conta. Quando o endereço certo for inserido, aparecerá uma mensagem dizendo que o e-mail de redefinição de senha foi enviado. Observação: existem várias maneiras de criar uma conta; por exemplo, usando um e-mail, um número de telefone, o Facebook ou a Apple. Tente fazer login usando essas opções para localizar a sua conta."
  },
  {
    question: "Proteger sua conta.",
    answer: "Nossa equipe de segurança trabalha incansavelmente para proteger sua conta e suas informações pessoais, mas você também deve tomar algumas medidas para aumentar ainda mais essa proteção."
  },
  {
    question: "Segurança do dispositivo.",
    answer: "Para garantir a segurança online em geral, mantenha o firmware, o sistema operacional e/ou o software antivírus do dispositivo atualizados. Confira o site de suporte do seu dispositivo para obter ajuda com isso."
  },
  {
    question: "Remover o acesso de aplicativos de terceiros.",
    answer: "Se algum acesso não autorizado for feito à sua conta, recomendamos remover todos os aplicativos de terceiros com acesso ao Spotify, pois eles podem ter sido comprometidos. Depois, você pode permitir o acesso novamente, se quiser."
  },
]

export function Faq() {
  return (
    <div className={styles.container}>
      {faqObj.map((item) => (
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}
