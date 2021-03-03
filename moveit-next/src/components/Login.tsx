import styles from '../styles/components/Login.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';

export function Login() {

    function login(){
        var inputValue = (document.getElementById('github') as HTMLInputElement).value;
        console.log(inputValue);
        Cookies.set('user', String(inputValue));
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <img src='logo-full.svg' />

                <h1>Bem Vindo</h1>
                <div>
                    <img src='pngegg.png' />  
                    <span>Faça login com sua conta do GitHub para começar.</span>
                </div>
                <div className={styles.form}>
                    <input id='github' type='text'></input> 
                    <Link href="/home">
                    <button onClick={login}> <img src='seta.png' height='90%'/> </button> 
                    </Link>
                </div>
            </div>
        </div>
    )
}    

export default Login;