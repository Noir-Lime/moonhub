import React, { useEffect } from "react";

const Root: React.FC = () => {
  useEffect(() => {
    // Console log after 2 seconds
    setTimeout(() => {
      console.log("Hello from the root page");
    }, 500);
  }, []);

  return (
    <div>
      <h1>Root asdf haha</h1>
    </div>
  );
};

export default Root;
