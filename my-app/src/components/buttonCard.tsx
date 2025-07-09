import "./style/ButtonCard.css"

type ButtonCardProps = {
  content: string;
  onClick?: () => void;
};


export default function ButtonCard({content,onClick}:ButtonCardProps) {
  return (
    <button className="explore-button" onClick={onClick}>
      {content}
      <div>
      <span className="arrows">❯</span>
      <span className="arrows">❯</span>
      <span className="arrows">❯</span>
      </div>
    </button>
  );
}
