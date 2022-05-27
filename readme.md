# Application

## Requirements
- Node v16.15.0 (LTS)
- PostgreSQL
- git
- Favourite IDE (which means VS Code)

## Getting Started
1. Clone the repository
   ```
   :$ git clone git@git.toptal.com:screening/Remi.git
   ```
2. Install all nodejs dependencies
   ```
   :$ npm install
   ```
3. Se up the environment variables. If you are using any service which gives you the opportunity to inject environment varibles use the `.env.example` for reference. You can also duplicate the eample file and rename to set up environment variables
    ```
    :$ cp .env.example .env
    ```
   Make sure to update the content to suit your environment

4. With the db settings set, run the migrate script to prepare the database for the application
   ```
   :$ npm run migrate
   :$ npm run seed
   ```
5. Start the application
   ```
   :$ npm run start
   ```

### Documentation

