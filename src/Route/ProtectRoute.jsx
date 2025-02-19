import React from "react";

export const ProtectRoute = () => {
  const userid = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (userid && token) {
      navigate(Path.Select);
    }
  }, []);
  return <div>ProtectRoute</div>;
};
