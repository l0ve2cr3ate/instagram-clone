#Instagram clone 

This project was created for learning purposes. It is based on [this](https://www.youtube.com/channel/UC1DUQiZduv_yNZy0O7n_iHA) Youtube video. Instead of using React and Javascript, this project uses React and Typescript.

## Stack
- Firebase
- React (Nextjs)
- Typescript
- Tailwind
- React-loading-skeleton

## Firebase setup
This project uses Firebase. If you want to run the app on your machine, you should create a firebase account with a new project. You can paste your config in the `src/lib/firebase` file. If you want to seed your db, replace the userId in the `seed.ts` file with the id of your Firebase auth user. You can watch [this](https://www.youtube.com/channel/UC1DUQiZduv_yNZy0O7n_iHA) Youtube video for more info.

## Commands
To run the app, you should first complete the firebase setup mentioned above. <br>
After completing your firebase setup, run the command: <br>
`npm install` <br>
To run the app locally, run the command: <br>
`npm start` <br>

To run the app in production mode locally run the command: <br>
`npm run build` <br>
`npm install -g serve` <br>
`serve -s build -l 3000` <br>






