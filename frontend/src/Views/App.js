import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CreateSkin } from './Skin Admin/CreateSkin.js';
import { UpdateSkin} from './Skin Admin/UpdateSkin.js';
import { PreviewSkin } from './Skin Preview/PreviewSkin';
import { SelfServiceSkin } from './Self Service/SelfServiceSkin.js';
import { ScenePreview } from './Scene Preview/ScenePreview.js';
import { Navbar } from './Utils/Navbar.js'
import { About } from './About.js';
import './CSS/App.css';
import { VistaPreview } from './Vista Preview/VistaPreview.js';


function App() {
  return (
    <div className="App">
      <div><Toaster/></div>
      <header>
        <Navbar/>
      </header>
        <Routes>
          <Route path="/" element={
            <CreateSkin/>}>
          </Route>
          <Route path="/skins/:skinId" element={
            <PreviewSkin/>}>
          </Route>  
          <Route path="/skins/:skinId/admin" element={
            <UpdateSkin/>}>
          </Route>
          <Route path="/selfservice" element={
            <SelfServiceSkin/>}>
          </Route>
          <Route path="/scenes" element={
            <ScenePreview/>}>
          </Route>
          <Route path="/vistas" element={
            <VistaPreview/>}>
          </Route>
          <Route path="/about" element={
            <About/>}>
          </Route>
        </Routes>
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
