# Contributing

Read the follow guide to have a better understanding of how to contribute to
this project.

## Coding Style

Please follow the [Style Guide](STYLEGUIDE.md)

## Branching

## Branching Workflow

We follow the
[Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).
The Feature Branch Workflow assumes a central repository, and master represents
the official project history. Instead of committing directly on their local
master branch, developers create a new branch every time they start work on a
new feature

## Merge Request Process

1. Create a branch from the master branch (latest version)
2. Implement feature or fix
3. Ensure all tests are passing locally (`yarn test`)
4. Ensure are the linting checks pass locally (`yarn lint`)
5. Raise a new merge request pointing to master branch
6. Assign a meaningful title
7. Document the changes
8. Double-check your create your merge request
9. Assign appropriate team members for review
10. Squash and merge the branch, to have a cleaner history of commits

## Branch & MR Naming Conventions

**Feature**

- Title: 💻 Feature - Title goes here
- Branch: `feature/idStoryCard-name-of-the-branch`

**Fix**

- Title: 🚒 Fix - Title goes here
- Branch: `fix/idStoryCard-name-of-the-branch`

## Merge Request Details Template

# Overview

Add some examples of unit tests for redux.

## Dependencies

- [ ] Depends on the MR #1609

## Outstanding Tasks

- [ ] Functional testing

## Screenshots or GIF (if appropriate)
