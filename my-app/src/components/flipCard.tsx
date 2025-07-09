import "./style/FlipCard.css";
import ButtonCard from "./ButtonCard";
import React, { useState } from "react";

type contentProps = {
  icon: React.ElementType;
  title:string;
  frontContent:string;
  backContent: string;
};



export default function FlipCard({frontContent, icon,backContent,title }: contentProps) {
  const Icon = icon;
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`flip-card ${flipped ? "flipped" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">

          <div className="icon-title">
            <div className="icon-container">
              <Icon className="icon"></Icon>
            </div>
            <div className="title"><h2 style={{display:"inline"}}>{title}</h2></div>
        
          </div>
          <div className="front-content">
            <p>{frontContent}</p>
          </div>
          <div className="button-container">
            <ButtonCard content="Read more" onClick={() => setFlipped(true)}></ButtonCard>
          </div>
          
        </div>

        <div className="flip-card-back">
          <p>{backContent}</p>
          <ButtonCard content="Go back" onClick={() => setFlipped(false)}></ButtonCard>
        </div>
      </div>
    </div>
  );
}
