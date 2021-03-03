import { Login } from '../components/Login';
import Head from 'next/head';

export function Index() {

    return (
        <div>
         <Head> <title> Move It!</title> 
         </Head> 
         
         <Login />
         </div>
    )
}    

export default Index;