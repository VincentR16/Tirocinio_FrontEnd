import "./style/Home.css";
import { HomeContext } from "../../customHook/HomeContext";
import { ScrollProvider } from "../../customHook/ScrollProvider";
import HomeComponent from "./HomeComponent";

export default function Home() {

  return (
    <HomeContext value={undefined}>
      <ScrollProvider>
         <HomeComponent></HomeComponent>
    </ScrollProvider>
    </HomeContext>
  );
}
