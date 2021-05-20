import classes from "./Tabs.module.scss";
import { createContext, useContext, useState } from "react";


// Create context between tab and content
const TabContext = createContext({
  currentTab: 0,
  changeTab: (index) => {},
});

export function TabContextProvider(props) {
  const [currentTab, setCurrentTab] = useState(0);

  function changeTab(index) {
    setCurrentTab(index);
  }

  const context = {
    currentTab: currentTab,
    changeTab: changeTab,
  };
  return <TabContext.Provider value={context}>{props.children}</TabContext.Provider>;
}

export function TabPills(props) {
  const tabCtx = useContext(TabContext);
  const changeTab = tabCtx.changeTab;
  const currentTab = tabCtx.currentTab;
  const labels = props.labels;
  const handleKeyPress = (event) => {
    event.preventDefault();
    if(event.keyCode === 0 || event.key === " "){
      event.target.click();
    }
  }
  return (
    <div className={classes.pills}>
      {labels.map((label, index) => {
        return (
          <span onKeyPress={handleKeyPress} key={index} className={currentTab === index ? classes.pill + " " + classes.active : classes.pill} onClick={()=>{changeTab(index)}} tabIndex={1}>
            {label}
          </span>
        );
      })}
    </div>
  );
}

export function TabContent(props) {
  const tabCtx = useContext(TabContext);
  const currentTab = tabCtx.currentTab;
  return <div className={props.index === currentTab ? classes.content + " " + classes.active : classes.content}>{props.children}</div>;
}



export default TabContext;
