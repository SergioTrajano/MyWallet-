import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIpComponent from './SignIpComponent';
import SignUpComponent from './SignUpComponent';
import '../css/reset.css';

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIpComponent />} />
                <Route path='/signUp' element={<SignUpComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


