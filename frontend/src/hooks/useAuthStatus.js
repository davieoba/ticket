import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }

    setLoading(false);
  }, [user]);

  return { loginStatus, loading };
};

export default useAuthStatus;
