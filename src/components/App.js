import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SignIpComponent from './SignIpComponent';
import SignUpComponent from './SignUpComponent';
import Wallet from './WalletComponent';
import NewTransactionComponent from './newTransactionComponent';
import '../css/reset.css';

function App() {
    const [user, setUser] = useState('');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIpComponent setUser={setUser}/>} />
                <Route path='/signUp' element={<SignUpComponent />} />
                <Route path='/wallet' element={<Wallet user={user} setUser={setUser}/>} />
                <Route path='/newTransaction/:transactionType' element={<NewTransactionComponent user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


