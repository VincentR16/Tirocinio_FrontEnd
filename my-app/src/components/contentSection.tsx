import ButtonCard from "./buttonCard";

type contentProps = {
    imageUrl: string,
    buttonName:string,
    content:string
};

export default function ContentSection({imageUrl,buttonName,content}:contentProps) {
  return (
    <section className="content">
      <div className="logo-container">
        <img
          src={imageUrl}
          alt="HL7logo"
          style={{ width: "250px", height: "auto" }}
        />
      </div>

      <p>
        {content}
      </p>
      <ButtonCard content={buttonName}></ButtonCard>
    </section>
  );
}
