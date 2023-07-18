import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "./SwitchTabs.scss";

const SwitchTabs = ({ data, onTabChange, loading }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      {!loading ? (
        <div className="tabItems">
          {data.map((tab, index) => (
            <span
              key={index}
              className={`tabItem ${selectedTab === index ? "active" : ""}`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          ))}
          <span className="movingBg" style={{ left }} />
        </div>
      ) : (
        <div className="tabItems" style={{ marginRight: 12 }}>
          <Skeleton variant="rectangular" width={30} height={20} />
          <Skeleton
            variant="rectangular"
            width={30}
            height={20}
            style={{ marginLeft: 5 }}
          />
        </div>
      )}
    </div>
  );
};

export default SwitchTabs;
