import './App.css';
import { Routes, Route } from 'react-router-dom';
import RouterRender from './ReactRouter/routerRender';

function App() {

  return (
    <div className='app'>
      <RouterRender/>
      {/* <Routes>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
      </Routes> */}
    </div >
  );
}

export default App;
