# playwright-bdd-example

A minimal example project that uses [playwright-bdd](https://github.com/vitalets/playwright-bdd) to run BDD tests with Playwright.

Here you can:

- [Report a bug with an agent](#bug-reports-with-an-agent)
- [Report a bug manually](#report-a-bug-manually)
- [Run the example](#setup)

## Bug reports with an agent

Give your coding agent this prompt along with your bug description:

```text
Create a minimal reproduction of the bug described below using https://github.com/vitalets/playwright-bdd-example.

1. Clone the example repository into a new temporary directory outside the current project. Make all reproduction changes in that clone, leaving the current project unchanged.
2. Follow the Setup section in its README to install dependencies and browsers, then run the existing tests to verify the setup works.
3. Match the relevant dependency versions and configuration from my bug report or the current project.
4. Make the smallest changes needed to reproduce the bug.
5. Run the reproduction and confirm it demonstrates the reported behavior.
6. Summarize the changes, exact command to reproduce, expected behavior, and actual output.
7. Once the reproduction is ready, push it to your own public GitHub repository or fork and provide the branch URL for the bug report.

Bug description:
[Describe the bug here]
```

## Report a bug manually

1. Follow the [setup instructions](#setup) and verify the existing tests pass.
2. Match the relevant dependency versions and configuration from your project, then make the smallest changes needed to reproduce the bug.
3. Run the tests and confirm the reported behavior.
4. [Share your reproduction](#share-your-reproduction) with the exact command to reproduce, expected behavior, and actual output.

## Setup

Clone the repository into a new directory outside your current project:

```sh
git clone https://github.com/vitalets/playwright-bdd-example.git
cd playwright-bdd-example
```

If you already cloned the repository, run the following commands from that directory.

> [!IMPORTANT]
> If you are using [Yarn Plug'n'Play](https://yarnpkg.com/features/pnp), please check out the [yarn-pnp](https://github.com/vitalets/playwright-bdd-example/tree/yarn-pnp) branch.

Install dependencies:

```sh
npm install
```

Install browsers:

```sh
npx playwright install
```

Run tests:

```sh
npm test
```

## Share your reproduction

Once the reproduction is ready, create your own public GitHub repository or [fork this repository](https://github.com/vitalets/playwright-bdd-example/fork). Point your clone's Git remote to that repository, then commit and push your reproduction changes.

[Open a bug report in playwright-bdd](https://github.com/vitalets/playwright-bdd/issues/new?template=1-bug-report.yml) and paste the branch URL in **Reproduction Demo URL**. If you already have a bug report, add the link there. No pull request is needed.
