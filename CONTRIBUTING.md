# Contributing to Shed

Thank you for your interest in helping us build and shape **Shed**!

We are taking our time, keeping things simple, and building an editor that is dependable and thoughtful. Whether you are fixing a bug, suggesting a feature, or helping us refine the documentation, your contribution is incredibly valuable.

---

## Reporting Issues

If you encounter a bug or have an idea for a feature, we would love to hear about it. Here is how you can help us address it effectively:

### 1. Check for Existing Issues

Before opening a new issue, please do a quick search through our open issues to make sure someone else hasn't already reported it or suggested it.

### 2. Write a Clear Report

The more context you can provide, the easier it is for us to understand, reproduce, and fix the issue. Please include:

* Your operating system and the version of Shed you are running.
* Clear, step-by-step instructions to reproduce the issue.
* What you expected to happen versus what actually happened.
* Any relevant screenshots, animations, or code snippets that illustrate the problem.

---

## Contributing Code

If you want to jump into the codebase and write code to fix a bug or build an improvement, here is the basic workflow to get started:

### Local Development Setup

To compile and run Shed locally from source:

1. Clone your fork of the repository.
2. Ensure you are using the correct target Node.js version (`v24.18.0`).
3. Install the dependencies and compile the workspace:
```bash
npm install --ignore-scripts
npx gulp vscode
```

### Submitting a Pull Request

* **Keep it focused:** Try to make sure each pull request addresses a single issue or implement a single cohesive feature.
* **Write clean code:** Follow the existing patterns in the codebase.
* **Test your changes:** Make sure the TypeScript compilation runs completely clean before submitting.

---

## Thank You

Your time, effort, and care make projects like **Shed** possible. We appreciate you being a part of this journey!
