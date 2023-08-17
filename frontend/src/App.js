import './App.css';
import { About } from './components/About';
import { Card, CardContent } from '@mui/material';
import styled from '@emotion/styled';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Contacts } from './components/Contacts';
import { AddContact } from './components/AddContact';

const StyledCard = styled(Card)`
    background-color: transparent;
    margin: 10px 20px;
    height: 100%;
`;

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div className="AppContainer">
                    <StyledCard>
                        <CardContent>
                            <Routes>
                                <Route path='/contacts' element={<Contacts />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/add-contact' element={<AddContact />} />
                            </Routes>
                        </CardContent>
                    </StyledCard>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
