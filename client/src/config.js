const isLocalDevelopment = process.env.NODE_ENV === "development";

const config = {
  app: {
    port: 3001,
    name: "backend",
    // url: "https://tfcivwc0ol.execute-api.ap-southeast-1.amazonaws.com/dev/",
    url: isLocalDevelopment
      ? "http://localhost:3001/"
      : "https://mern-app-backend-dusky.vercel.app/",
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "db",
  },
};

export default config;
