"use client";

import { ConfigProvider, Spin,  } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const PageRender = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);


  return (
    <ConfigProvider
      direction="ltr"
      theme={{
        token: { fontFamily: "'Inter', sans-serif" },
      }}
    >
      {isLoading ? <div className="flex justify-center items-center h-screen"><Spin/></div> : children}
      <ToastContainer position="top-right" autoClose={1000} />
    </ConfigProvider>
  );
};

export default PageRender;