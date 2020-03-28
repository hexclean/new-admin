Install:
1) npm init
2) npm install --save express express-validator bcrypt config jsonwebtoken mongoose request bcrypt bcryptjs connect-mongodb-session express-session connect-mongodb-session ejs passport passport-google-oauth20 cookie-session
3) npm install --save -D nodemon concurrently

If have changes;
1) git init
2) git add .
3) git commit -m "first commit"
4) git remote add origin https://github.com/hexclean/foodApp.git
5) git push -u origin master

Setup client side:
1) npx create-react-app client
2) cd client
3) npm run
4) npm install --save axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment react-router-dom

In client side in package.json use this:
  "proxy": "http://localhost:5000"

In admin side in package.json use this:
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""

Start project: npm run dev

// Heroku push
$ git add .
$ git commit -am "make it better"
$ git push heroku master



npm install --save passport-local
