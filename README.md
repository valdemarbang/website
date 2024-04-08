[![Tests](https://github.com/TDDD96-G11-BLHub/website/actions/workflows/test.yml/badge.svg)](https://github.com/TDDD96-G11-BLHub/website/actions/workflows/test.yml)
[![Static Analysis](https://github.com/TDDD96-G11-BLHub/website/actions/workflows/lint.yml/badge.svg)](https://github.com/TDDD96-G11-BLHub/website/actions/workflows/lint.yml)
[![Deployment](https://github.com/TDDD96-G11-BLHub/website/actions/workflows/deploy.yml/badge.svg)](https://github.com/TDDD96-G11-BLHub/website/actions/workflows/deploy.yml)

# The BLHub Website

This repository hosts the main BLHub project website as well as the automatic deployment to GitHub Pages.
The website is built using [Vite](https://vitejs.dev/) (using [SWC](https://swc.rs/) as the compiler) with React and TypeScript for all the user interface and code logic.

![](src/assets/blhub-logo.svg)

## Installation

Follow these steps to get the project up and running on your local machine:

1. **Download and Install Node.js:** Ensure you have Node.js installed on your system. If not, you can download and install the latest version from the [official Node.js website](https://nodejs.org/).

2. **Clone the Repository:** Clone this repository to your local machine using:
    ```bash
    git clone https://github.com/TDDD96-G11-BLHub/website.git
    ```

3. **Navigate to the Project Directory:** Navigate to the project directory:
    ```bash
    cd website
    ```

4. **Install Dependencies:** Install the project dependencies using npm:
    ```bash
    npm install
    ```

5. **Check for Vulnerabilities and Fix:** Check for any vulnerabilities in the dependencies and apply fixes using npm audit:
    ```bash
    npm audit fix
    ```

6. **Run the Application:** Finally, run the application:
    ```bash
    npm run dev
    ```

The application should now be running locally. You can access it by opening a web browser and navigating to `http://localhost:5173`.