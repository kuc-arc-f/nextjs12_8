/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages/', 'components/', 'client/']
  },
  env: {
    COOKIE_KEY_USER_ID: "next12uid",
    CSRF_SECRET: "secret1234",
    APOLLO_SV_URI: "http://localhost/dev/graphql",
  },  
}
