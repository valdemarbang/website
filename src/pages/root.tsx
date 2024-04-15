/* 
    Every page has the header, footer, sidebars, etc. 
    We don't need to include those files are in the all pages.
    Instead we can make a parent component all those pages.
*/
import TopBar from "../components/TopBar.tsx";

function RootPage() {
  return <>
    <TopBar />
  </>;
}

export default RootPage;
