
# expenses-tracker - SERVER

## Use

### Configure :

- Create a `.env` file looking like `.env.example`
  - you can install mongoDB on your machine or set a distant server with mongo on it.

```
npm install
npm run start[-dev]

```

#### Configure HTTPS

The application had been designed to run in https mode for security.

A standard key had been generate and saved in [/keys](./keys/).

go to the server location path. <br />
cd to keys <br />
then :
```
:openssl genrsa 2048 > private.key
:openssl req -new -key private.key -out cert.csr
:openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```

<!-- TODO Explain HTTPS configuration in production context -->

## Contribute

1st time :
```
npm install -g eslint eslint-plugin-react
```

Then :

run with nodemon : `npm run start-dev`

run in debug mode : `npm run debug`


### Before pull request

```
npm run lint
npm run test
```
