import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import cardImg from "../images/card-img.png";

const Cardlks = (props) => {
  return (
    <div className="card-lks">
      <Card style={{ width: "18rem" }}>
        <Link to="/article">
          <Card.Img 
            variant="top" 
            style={{ height: "16rem", objectFit: "cover" }} 
            src={"http://dev.backend.littleknitsstory.com" + props.image_preview}
            alt={props.image_alt} 
          />
        </Link>
        <Card.Body>
          <Card.Title>
            {props.title}
          </Card.Title>

          <div className="card-lks__text">
            {props.content}
          </div>
          <div className="card-lks__footer">
            <div className="card-lks__author">
              Автор:
              <br /> {props.author}
            </div>
            <div className="card-lks__created_at">
              <br /> {props.created_at}
            </div>
            <div className="card-lks__btn">
              <Link to="/article">
                <button className="btn btn_vinous btn_center ">
                  <div className="btn__text btn__text_center">Читать</div>
                </button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardlks;
