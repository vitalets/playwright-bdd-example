# playwright-bdd-example

Example project that uses [Playwright-BDD](https://github.com/vitalets/playwright-bdd) with [Yarn Plug'n'Play](https://yarnpkg.com/features/pnp).

## How to report a bug

1. [Fork](https://github.com/vitalets/playwright-bdd-example/fork) the repo!
2. Clone it to your local machine

   ```
   git clone https://github.com/YOUR_GITHUB_USERNAME/playwright-bdd-example.git
   ```

3. Change directory to `playwright-bdd-example`

   ```
   cd playwright-bdd-example
   ```

4. Install dependencies

   ```
   yarn
   ```

5. Install browsers

   ```
   yarn playwright install
   ```

6. Run tests

   ```
   yarn test
   ```

   Output:

   ```
   Running 2 tests using 1 worker
   2 passed (2.3s)
   ```

7. Make changes reproducing a bug

8. Commit and push changes
   ```
   git add .
   git commit -m'repro for playwright-bdd issue xxx'
   git push
   ```
9. [Open a pull-request](https://github.com/vitalets/playwright-bdd-example/pulls) and share the link to your repo.
