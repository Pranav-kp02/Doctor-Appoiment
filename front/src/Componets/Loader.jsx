import React, { useEffect, useState } from "react";
import "./loader.css";
import { API } from "../AXIOS";

function Loader() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    API.interceptors.request.use(
      function (config) {
        setLoading(true);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    API.interceptors.response.use(
      function (response) {
        setLoading(false);
        return response;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
  });
  return (
    loading && (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className="loader-circle"></div>
          <div className="loader-spinner"></div>
        </div>
      </div>
    )
  );
}

export default Loader;
