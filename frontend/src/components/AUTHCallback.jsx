import React, { useEffect } from "react";
import { useAuth } from "react-use-auth";

const AUTHCallback = () => {
  const { handleAuthentication } = useAuth();
  useEffect(() => {
    handleAuthentication({ postLoginRoute: "/dashboard" });;
  }, [handleAuthentication]);
  return (
    <h3>
      This is the auth callback page, you should be redirected immediately.
    </h3>
  );
};

export default AUTHCallback;