import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";
import { useScrollContext } from "../context/ScrollContext";
import "./style/Navbar.css";
import { AuthTypeEnum, type AuthType } from "../types/Auth.type";



type NavBarProps = {
  setAuthType: (type: AuthType) => void;
};

export default function Navbar({ setAuthType }: NavBarProps) {
  const { scrollToAbout, scrollToLogin } = useScrollContext();

  const tabs = [
    {
      label: "About us",
      action: () => {
        scrollToAbout();
      },
    },
    {
      label: "Login",
      action: () => {
        scrollToLogin();
        setAuthType(AuthTypeEnum.LOGIN);
      },
    },
    {
      label: "Signup",
      action: () => {
        scrollToLogin();
        setAuthType(AuthTypeEnum.REGISTER_PATIENT)
      },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = tabRefs.current[activeIndex];
    const pill = pillRef.current;

    if (current && pill) {
      const offsetLeft = current.offsetLeft;
      const width = current.offsetWidth;

      pill.style.transform = `translateX(${offsetLeft}px) translateY(-50%)`;
      pill.style.width = `${width}px`;
    }
  }, [activeIndex]);

  return (
    <div className="tab-header">
      <div className="logo">
        <Shield
          className="h-8 w-8 text-white"
          style={{ width: "2.5rem", height: "2.5rem" }}
        />
        <span>
          <h2 style={{ display: "inline" }}>Med</h2>
          <h2 style={{ display: "inline", color: "rgb(29, 79, 217)" }}>
            Trust
          </h2>
        </span>
      </div>
      <div className="tab-wrapper">
        <div className="vertical-line"></div>
        <div className="pill" ref={pillRef} />
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`tab-button ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              setActiveIndex(index);
              tab.action();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
