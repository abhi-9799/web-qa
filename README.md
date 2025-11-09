# Signup Automation Demo

This is a small, realistic QA automation project I built **incrementally**.

It started as a plain HTML page with a form.  
From there, I added:
1) Client-side validation  
2) A mock Express API  
3) Password-strength rules + UI hints  
4) Full Playwright end-to-end tests  
5) GitHub Actions CI  

The goal was to practice real-world test flows without getting stuck in heavy frameworks.

---

## Features

- Minimal signup page (HTML + JS)
- Client-side validation:
  - Name must be ≥ 2 chars
  - Email format check
  - Password min length + strength scoring
- Password strength meter with color + label
- Mock `/api/signup` endpoint
- Playwright tests for:
  - Page rendering
  - Validation errors
  - Password strength UI
  - Successful signup
- Runs fully in GitHub Codespaces
- CI enabled via GitHub Actions

---

## How it evolved (step-by-step)

1) Created a static signup page  
2) Added client-side validation for required fields  
3) Added a mock Express API endpoint  
4) Wrote a basic “page loads” Playwright test  
5) Added tests for form validation  
6) Added password strength meter + tests  
7) Added success handling + tests  
8) Enabled CI so tests run on each push  

This mirrors how I approach work:  
> **Start small → validate → improve → automate.**

---

## Tech Stack

- **Playwright** — browser automation
- **Node.js**
- **Express** — mock backend / API
- **HTML + JS**
- **GitHub Actions** — CI

---
