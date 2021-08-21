const axios = require("axios");

const WIKIPEDIA_URL = "https://es.wikipedia.org/api/rest_v1/page/random/summary";

module.exports = async () => {
  const { data } = await axios.get(WIKIPEDIA_URL);

  return {
    title: data.titles.normalized,
    content: data.extract
      .split(".")
      .filter((_, idx) => idx < 2)
      .join("."),
  };
};
