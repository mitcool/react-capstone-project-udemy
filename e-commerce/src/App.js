import './categories.styles.scss'
import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import Shop from './routes/shop/shop.component';
import SignIn from './routes/sign-in/sign-in.component';
import { Routes,Route } from 'react-router-dom';

const App = () => {
  return( 
        <Routes>
          <Route path="/" element={<Nav/>}>
              <Route index element={<Home/>} />
              <Route path='shop' element={<Shop/>} />
              <Route path='sign-in' element={<SignIn/>} />
          </Route>
       </Routes>
      )
}

export default App