const fetch = require("node-fetch");
fetch("/hello")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
