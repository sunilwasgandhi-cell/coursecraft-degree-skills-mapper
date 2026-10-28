# Coursecraft

A browser-based prototype for connecting a degree course to example career pathways, skills, and curriculum mapping ideas.

## Run it locally

Open `index.html` in a modern browser. No build step or package installation is needed.

## What it does

- Accepts a degree or course name.
- Shows example roles and skill clusters for Computer Science, Business Administration, and Psychology.
- Provides a general starting-point profile for other course names.
- Lets a curriculum team select skills, add existing modules, and map skills to those modules.
- Creates a proposed module when a selected skill has no natural home.
- Suggests activity and assessment ideas for skills that remain unmapped.
- Saves each course and curriculum map in the browser's local storage, restoring the last active course when reopened.
- Exports a Markdown curriculum plan for sharing or further editing.

## Current scope

The course profiles are illustrative examples stored in `app.js`. They are not live job-market data, and an unfamiliar degree name receives the general profile rather than a course-specific analysis. Validate role and skill priorities with local job postings, employers, accreditation requirements, and graduate outcomes before using them for curriculum decisions.

## GitHub Pages

This repository is private and Pages is not enabled yet. A GitHub Pages site is publicly accessible on the internet. After you confirm that you want the app published publicly, enable GitHub Pages with the Actions source and add the deployment workflow.
