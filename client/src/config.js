const config = {
  app: {
    port: 3001,
    name: "backend",
    // url: "http://localhost:3001/",
    url: "https://tfcivwc0ol.execute-api.ap-southeast-1.amazonaws.com/dev/",
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "db",
  },
};

export default config;
