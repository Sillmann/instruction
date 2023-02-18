import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListAll from './instruction/pages/Listall';
import New from './instruction/pages/New';
import Update from './instruction/pages/Update';
import Delete from './instruction/pages/Delete';
import View from './instruction/pages/View';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/listall" element={<ListAll />} />
          <Route path="/new" element={<New />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete/:id" element={<Delete />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
