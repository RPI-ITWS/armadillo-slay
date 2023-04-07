Prerequisites: 
    1. Create a .env file in the project root folder, and add the following environment variables:
        MONGODB_URI=mongodb://localhost:27017/yourdbname
        PORT=3001
        Replace yourdbname with your desired database name.
    2. Start the MongoDB server:
        For Windows, open the Services application and start the MongoDB service.
        For macOS and Linux, open a terminal and run:
        sudo systemctl start mongod
    3.In the project root folder, start the backend server:
        yarn run server


1. Download the files 
2. clone the repo 
3. run 
    yarn 
4. run 
    yarn start 
5. run 
    yarn build
6. Deoplyment
    Using SSH: 
        USE_SSH=true yarn deploy 
    Not using SSH: 
        GIT_USER<Your Github username> yarn deploy

* Note: do not write any npm 