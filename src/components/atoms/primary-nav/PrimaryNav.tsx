import React, { useContext } from "react"
import { Container, Row, Col } from "react-bootstrap";
import { IMenuResponse } from "../../../api/models"
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../../App"
import { useGet } from "../../Hooks/useFetch";

import "./primary-nav.scss"

interface propTypes {
    type: "footer" | "header";
  }

const PrimaryNav = (props: propTypes) => {
  const { language } = useContext(LanguageContext)
  const { data, loading, error } = useGet<IMenuResponse>(
    { 
      url: "MENU", 
      method: "GET", 
      lang: language, 
    })
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (error) {
  //     navigate("/error")
  //   }
  // }, [data, error])
  
  const filteredMenu = data?.results.filter(item => item.menu.hint === props.type)
  .sort((a, b) => a.ordering - b.ordering)
  
  if (error) {
    return (
      <Container>
        <Row>
          <Col>
            
            <div className="page404__subtitle-menu">Can't load menu. Please refresh page</div>
            
              
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
    {!error && filteredMenu?.map(item => (
    item.target ? 
      <a 
        key={item.id} 
        className="primary-nav-links" 
        href={item.url} 
        target={item.target}
      >
          {item.name}
      </a> :
      <NavLink 
        key={item.id} 
        className="primary-nav-links" 
        to={item.url}
      >
        {item.name}
      </NavLink>
    ))}
    </>
  )
}

export default PrimaryNav