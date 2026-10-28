# Coursecraft

A browser-based prototype for connecting a degree course to example career pathways, skills, and curriculum mapping ideas.

## Run it

Open `index.html` in a modern browser. No build step or package installation is needed.

## Live app

The app is published at [sunilwasgandhi-cell.github.io/coursecraft-degree-skills-mapper](https://sunilwasgandhi-cell.github.io/coursecraft-degree-skills-mapper/). The public repository is [sunilwasgandhi-cell/coursecraft-degree-skills-mapper](https://github.com/sunilwasgandhi-cell/coursecraft-degree-skills-mapper).

GitHub Actions deploys the static site from the `main` branch after each push. The deployment workflow is in `.github/workflows/static.yml`.

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

To add a tailored course profile, add an entry to `profiles` in `app.js` with an `insight`, `roles`, and `skills` array. A production version could replace this local catalogue with an evidence-backed job-posting source and an analysis service, while retaining human review and the curriculum mapping workflow.
