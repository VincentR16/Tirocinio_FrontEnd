import "./style/Home.css";
import { HomeProvider } from "../../customHook/HomeProvider";
import { ScrollProvider } from "../../customHook/ScrollProvider";
import HomeComponent from "./HomeComponent";

export default function Home() {

  return (
    <HomeProvider>
      <ScrollProvider>
         <HomeComponent></HomeComponent>
    </ScrollProvider>
    </HomeProvider>
  );
}
