import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CreateSkin } from './CreateSkin.js';
import { UpdateSkin} from './UpdateSkin.js';
import { PreviewSkin } from './PreviewSkin';
import { Menu } from './Utils/Menu.js';
import { About } from './About.js';
import './CSS/App.css';

function App() {
  return (
    <div className="App">
      <div><Toaster/></div>
      <header className="App-header">
        <Menu/>
        <br/>
        <h1 className='App-title'>RESKIN</h1>
        <h3 className='App-title'>No scrape, no hotlink, no fuss</h3>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/skins" element={
            <CreateSkin/>}>
          </Route>
          <Route path="/skins/:skinId" element={
            <PreviewSkin/>}>
          </Route>  
          <Route path="/skins/:skinId/admin" element={
            <UpdateSkin/>}>
          </Route>
          <Route path="/skins/about" element={
            <About/>}>
          </Route>
        </Routes>
      </BrowserRouter>
      <br/>
      <br/>
      <div className='App-footer'>
        <p>All dragon and scene images property of <a className='App-link' href="https://www.flightrising.com">Flight Rising</a> © Stormlight Workshop LLC<br/>
        All skin images owned by their respective creators</p>
      </div>
    </div>
  );
}

export default App;
