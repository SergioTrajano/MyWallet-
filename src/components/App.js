import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIpComponent from './SignIpComponent';

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIpComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


