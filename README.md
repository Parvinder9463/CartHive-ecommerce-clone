# Flipkart Clone Project - MERN Stack

![Filpkart Clone SS](https://github.com/adityaS011/ecommerce-clone/blob/main/flipkartclone.png)

<body>
  <p>This is a Flipkart clone project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project consists of two main folders: <code>client</code> and <code>server</code>, representing the front-end and back-end components respectively. Redux is used for state management, and Material-UI is utilized for building the user interface. The project is hosted on Netlify for the client-side and on another platform (e.g., Heroku) for the server-side.</p>

  <h2>Project Structure</h2>
  <pre>
  flipkart-clone/
    ├── client/
    |    ├── public/
    |    ├── src/
    |    |    ├── actions/            # Redux actions
    |    |    ├── components/         # Reusable React components
    |    |    ├── reducers/           # Redux reducers
    |    |    ├── App.js              # Main App component
    |    |    ├── index.js            # Entry point of the React app
    |    |    └── ...
    |    ├── package.json
    |    ├── package-lock.json
    |    └── ...
    └── server/
        ├── controllers/             # Express.js controllers
        ├── models/                  # MongoDB models
        ├── routes/                  # Express.js routes
        ├── index.js                 # Entry point of the server
        └── ...
  </pre>

  <h2>Getting Started</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (version >= 12)</li>
    <li>npm (Node Package Manager)</li>
  </ul>

  <h3>Installation</h3>
  <p>Clone the repository:</p>
  <pre>
  git clone https://github.com/your-username/flipkart-clone.git
  cd flipkart-clone
  </pre>

  <p>Install dependencies for both the client and server:</p>
  <pre>
  cd client
  npm install

  cd ../server
  npm install
  </pre>

  <h2>Development</h2>
  <p>Start the development server for the client (front-end):</p>
  <pre>
  cd client
  npm start
  </pre>
  <p>The client will run on <code>http://localhost:3000</code>.</p>

  <p>Start the development server for the server (back-end):</p>
  <pre>
  cd server
  npm start
  </pre>
  <p>The server will run on <code>http://localhost:5000</code>.</p>
</body>
</html>
