function updateOptions(options) {
  const update = {
    ...options,
    headers: { ...options.headers, Accept: "application/json" },
  };
  if (userData.token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${userData.token}`,
    };
  }
  return update;
}

const fetcher = (apiEndPoint, options) => {
  return fetch(BASE_URL+ apiEndPoint, updateOptions(options));
};