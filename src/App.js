import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios';
import Cart from './routes/Cart.js'


function App() {
  let local = localStorage.getItem('watched')
    console.log(local)
    if ( local == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }


  let [shoes, setShoes] = useState(data)
  let navigete = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => { navigete('/') }}>RMart</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => { navigete('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigete('/cart') }}>cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className='row' >
                {
                  shoes.map(function (a, i) {
                    return (
                      <Card shoes={shoes[i]} i={i} ></Card>
                    )
                  })
                }
              </div>
            </div>
            
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((data) => {
                  let copy = [...shoes, ...data.data];
                  setShoes(copy);
                })
            }}>버튼</button>


            <div className="container">
              <div className='row p-5' >
               <h3 className='p-5'>최근본상품</h3>
                {
                  
                  shoes.map(function (a, i) {
                    let item = localStorage.getItem('watched')
                    let recent = JSON.parse(item)
                    
                    return (
                      <Recently shoes={recent[i]} i={recent[i]} ></Recently>
                    )
                  })
                }
              </div>
            </div>

          </>
        } />
        <Route path="/detail/:id" element={

          <Detail shoes={shoes} />

        } />

        <Route path="/cart" element={<Cart />} />

      </Routes>


    </div >
  );
}


function Card(props) {
  let navigete = useNavigate();
  return (
    <div onClick={() => { navigete('/detail/' + props.i) }} className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} alt="" width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}원</p>
    </div>
  )
}

function Recently(props) {


  let navigete = useNavigate();
  return (
    <div onClick={() => { navigete('/cart') }} className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} alt="" width="30%" />
    </div>
  )
}
export default App;
