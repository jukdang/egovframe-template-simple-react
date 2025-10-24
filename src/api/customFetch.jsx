import { SERVER_URL } from "../config";

const ORIGINAL_FETCH = window.fetch;

window.fetch = async (url, options = {}) => {
  let requestOptions = { ...options };

  // credentials 기본값 추가
  if (!requestOptions.credentials) {
    requestOptions = { ...requestOptions, credentials: "include" };
  }

  return ORIGINAL_FETCH(SERVER_URL + url, requestOptions);
};