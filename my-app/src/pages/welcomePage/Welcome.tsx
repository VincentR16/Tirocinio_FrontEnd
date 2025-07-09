import "./style/Welcome.css";
import Card from "../../components/Card";
import BlurText from "../../components/BlurText";
import NavBar from "../../components/Navbar";
import FlipCard from "../../components/FlipCard";
import GradientText from "../../components/GradientText";
import { AuthenticationForm } from "../../components/Login";
import { Briefcase, FileArchive, Lock } from "lucide-react";
import { useScrollContext } from "../../customHook/ScrollContext";
import ReactLogo from "../../assets/react.svg";
import { Flex } from "@mantine/core";


export default function Welcome() {
  const { aboutRef, loginRef } = useScrollContext();
 

  return (
    <div ref={aboutRef} className="background">
      <NavBar />
      <header>
        <div className="container">
          <div className="title-container">
            <BlurText
              text="Managed Security for Electronic Health Records"
              delay={470}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8 blur-text"
            />
          </div>
          <aside>
            <Card
              title="Meet the Team"
              text="We are a team of professionals in cybersecurity and digital health with a clear mission:
                    to protect healthcare information in the most secure and advanced way possible."
            />
          </aside>
        </div>
      </header>

      <main>
        <hr className="custom-hr" />
        <div className="main-container">
          <div className="title-container">
            <h1 style={{ display: "inline" }}>Featured</h1>
            <h1 style={{ display: "inline", color: "rgb(29, 79, 217)" }}>
              Technologies
            </h1>
          </div>

          <div className="flip-card-grid">
            <FlipCard
              icon={FileArchive}
              title="HL7"
              frontContent="The HL7 protocol is adopted to standardize healthcare data exchange, enable seamless 
                            interoperability between systems, and improve the accuracy and efficiency."
              backContent="HL7 (Health Level Seven) is a set of international standards for the exchange, integration, sharing, and retrieval of electronic health information. It is used to enable interoperability between different healthcare systems, such as hospital software, labs, pharmacies, and electronic health records (EHRs)."
            />
            <FlipCard
              icon={Lock}
              title="EHR"
              frontContent="Our system utilizes Electronic Health Records to centralize patient data, enhance accessibility, and support accurate, coordinated, and efficient medical care."
              backContent="Electronic Health Records (EHRs) are digital versions of patients' medical histories, stored and managed by healthcare providers. They contain essential clinical information and are used to support efficient, accurate, and coordinated care. EHRs improve access to health data, streamline communication between professionals, and help ensure safer, more informed medical decisions."
            />
            <FlipCard
              icon={Briefcase}
              title="Zero Trust"
              frontContent="We adopt this protocol to enforce strong access control, minimize security risks, and ensure that only verified users and devices can interact with sensitive healthcare systems and data."
              backContent="Zero Trust Architectures (ZTAs) are security models that require strict verification for every person and device attempting to access resources within a network. Instead of assuming trust based on location or credentials, they enforce continuous authentication and least-privilege access. ZTAs reduce the risk of breaches by limiting lateral movement, enhancing visibility, and ensuring granular control."
            />
          </div>
        </div>
        <div ref={loginRef}>
          <hr className="custom-hr" />

          <div className="form-container">
            <GradientText
              colors={["#2563eb, #0f172a,#2563eb,#0f172a"]}
              animationSpeed={3}
              className="custom-class"
            >
              Welcome to MedTrust
            </GradientText>
            <AuthenticationForm className="auth-container"></AuthenticationForm>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-container">
          <Flex p="md" w="100%" align="center" direction="column" gap="md">
            <p>Powered by :</p>
            <img src={ReactLogo} alt="React Logo" />
            <hr />
            <p>&copy; 2025 MedTrust. All rights reserved.</p>
          </Flex>
        </div>
      </footer>
    </div>
  );
}
