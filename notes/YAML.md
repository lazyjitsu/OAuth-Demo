## Notes on the pipeline yaml file (.github/workflows/node.yml)

name: OAuth2.0 Demo
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    env: <--- we can define optios that the steps would use as env variables>
      NODE_OPTIONS: --max_old_space_size=4096
      CI: true <-- tells create  react test script we are in CI mode don't prompt>
      <--we could put any variable such as PORT>
      PORT:1234
      <!-- But not just that we can run our tests and in fact, the entire build job in different environments by setting this strategy option.And specifically by setting different variables on this matrix option inside of strategy. So say we wanted to make sure that our code works not just on version 16 of Node, but also on version 14.
        We could set a property inside of this strategy matrix to say that our commands should be run on node dash version, passing in a few different versions of Node. So we can say we want things to work on version 16. X. As well as version 14 X, this will take the latest available versions of both Node 14 and Node 16 and create two build jobs that run in parallel, which each run through all of these steps in our workflow. -->
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Build project
        run: npm run build --prefix client
