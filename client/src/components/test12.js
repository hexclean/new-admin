import api from "./utils/api";

export const getFilteredProducts = (filters = {}) => {
  const data = {
    filters,
  };
  api
    .post("/api/restaurants/ok12")
    .then((response) => {
      console.log("response", response);

      JSON.stringify(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
