# Application

## Requirements
- Node v16.15.0 (LTS)
- PostgreSQL
- git
- Favourite IDE (which means VS Code)

## Getting Started

1. After cloning the reposiory, Install all nodejs dependencies
   ```
   :$ npm install
   ```
2. Set up the environment variables. If you are using any service which gives you the opportunity to inject environment varibles use the `.env.example` for reference. You can also duplicate the eample file and rename to set up environment variables
    ```
    :$ cp .env.example .env
    ```
   Make sure to update the content to suit your environment

3. With the db settings set, run the migrate script to prepare the database for the application
   ```
   :$ npm run migrate
   :$ npm run seed
   ```

4. Setup OAuth2 signing keys
   ```
   openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
   openssl genrsa -out config/jwt/private.pem -aes256 4096
   ```

5. Start the application
   ```
   :$ npm run start
   ```




### Documentation

