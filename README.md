# playwright-bdd-example

Example project that uses [playwright-bdd](https://github.com/vitalets/playwright-bdd) to run BDD tests.

## How to run it locally / How to report a bug

1. [Fork](https://github.com/vitalets/playwright-bdd-example/fork) the repo
2. Clone it to your local machine
   ```
   git clone https://github.com/<%your github username%>/playwright-bdd-example.git
   ```

2. Change directory to `playwright-bdd-example`
   ```
   cd playwright-bdd-example
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Install browsers
   ```
   npx playwright install
   ```

5. Run tests
   ```
   npm test
   ```
   Output:
   ```
   Running 2 tests using 1 worker
   2 passed (2.3s)
   ```

6. Make changes reproducing a bug

7. Commit and push changes
   ```
   git add .
   git commit -m'repro for playwright-bdd issue xxx'
   git push
   ```
8. [Open a pull-request](https://github.com/vitalets/playwright-bdd-example/pulls) and share the link