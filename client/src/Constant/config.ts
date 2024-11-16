const env = process.env.REACT_APP_APP_ENV;
const commonConfig = {
  webName: "quicktix.com",

  facebook: "https://web.facebook.com/profile.php?id=61560034121554",
  instergram: "https://www.instagram.com/beachsrilankatravel/",

  address: "No.248/ B, Hithgoda ,Wettewa, Galagedara , Sri lanka.",
  mobile: "+94771617400",
  email: "quicktix@gmail.com",
  whatsapp: "+94771617400",
  devsSite: "https://taprodev.com/",

  noImage: "No_Image_Available.jpg",
};

const baseDomainProd = window.location.hostname.includes("www")
  ? "https://www.trainedguide.com"
  : "https://trainedguide.com";

const baseDomainQa = window.location.hostname.includes("www")
  ? "https://www.qa.trainedguide.com"
  : "https://qa.trainedguide.com";

const environments = {
  development: {
    webLink: "http://localhost:3000",
    server: "http://localhost/app/newtrainedguide/trained-guide/server",
    serverapi: "http://localhost:8080/api",
    imagepath: `http://localhost/image`,
  },
  qa: {
    webLink: `${baseDomainQa}`,
    server: `${baseDomainQa}/server`,
    serverapi: `${baseDomainQa}/server/Api`,
    imagepath: `${baseDomainQa}/image`,
  },
  production: {
    webLink: `${baseDomainProd}`,
    server: `${baseDomainProd}/server`,
    serverapi: `${baseDomainProd}/server/Api`,
    imagepath: `${baseDomainProd}/image`,
  },
};

// Merge common configuration with environment-specific configuration
const config = {
  ...commonConfig,
  ...environments[env],

  // Web routes
  homepageurl: "/",
  authpage:'Auth',
  loginsuccess:'login-success',
  dashboard:'dashboard',
};

export default config;
