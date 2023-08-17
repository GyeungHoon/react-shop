import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";

function Detail(props) {

  let dispatch = useDispatch()

  let [fade2, setFade2] = useState('')

  useEffect(()=>{
  let 꺼낸거 =  localStorage.getItem('watched')
  꺼낸거 = JSON.parse(꺼낸거)
  꺼낸거.push(찾은상품.id)
  꺼낸거 = new Set(꺼낸거)
  꺼낸거 = Array.from(꺼낸거)
  localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])

  useEffect(() => {
    let a = setTimeout(() => {
      setalert(false)
    }, 2000)
    return () => {
      clearTimeout(a)
    }
  }, [])

  useEffect(()=>{
    setFade2('end')
    return ()=>{
      setFade2('')
    }
  },[])
  let { id } = useParams();
  let [alert, setalert] = useState(true)
  let [탭, 탭변경] = useState(0)
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id
  });

  return (
    <div className={'container start ' + fade2}>
      {
        alert == true ?
          <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
          : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+ (찾은상품.id + 1)+'.jpg'} alt="" width="100%" />
        </div>
        <div className="col-md-6 mt-4">

          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({id : 1, name : 'Red Knit', count : 1}))
          }}>주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">구매평</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">상품설명</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">고객센터</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />


    </div>
  )
};
function TabContent(props) {

  let [fade, setFade] = useState('')

  useEffect(() => {
    setTimeout(() => { setFade('end') }, 100)
    return () => {
      setFade('')
    }
  }, [props.탭])



  return (<div className={'start ' + fade}>
    {[<div>매우좋음</div>, <div>편안하고 가벼운 운동화</div>, <div>클레임은 사절임</div>][props.탭]}
  </div>)
}

export default Detail;