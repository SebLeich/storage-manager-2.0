[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)](https://github.com)
[![Angular](https://img.shields.io/badge/Angular-DD0031.svg?style=for-the-badge&logo=Angular&logoColor=white)](https://github.com)
[![Three.js](https://img.shields.io/badge/Three.js-000000.svg?style=for-the-badge&logo=threedotjs&logoColor=white)](https://github.com)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://github.com)
[![Jasmine](https://img.shields.io/badge/Jasmine-8A4182.svg?style=for-the-badge&logo=Jasmine&logoColor=white)](https://github.com)
[![Cypress](https://img.shields.io/badge/Cypress-17202C.svg?style=for-the-badge&logo=Cypress&logoColor=white)](https://github.com)

# Storage Manager 2.0

**Live-Demo available on Github Pages: [V0.0.1](https://sebleich.github.io/storage-manager-2.0)**

**[Latest version](https://sebleich.de)**

![Preview of a solution](.github/demo.jpg)

## Overview

Efficient loading is a significant challenge in logistics. 
The Storage Manager application aims to assist users in finding optimal solutions. 
Originally developed for a competition at TU Dresden, the application is built with TypeScript (Angular 17), employing three.js and Chart.js. 
Presently, three algorithms are provided:

### All In One Row

This algorithm arranges all orders in a single row, commencing from the bottom left corner of the container.

### Start Left Bottom

Supporting stacking, this algorithm places orders adjacent to each other.

### Super Flo

Utilizing temporarily unused spaces, this algorithm optimizes order placement.

## Future Enhancements

Future iterations will focus on enhancing the algorithms. For example, addressing issues such as the invalid solutions generated by the Start Left Bottom algorithm and integrating group restrictions into the Super Flo algorithm. Additionally, all algorithms will be upgraded to support animation features; presently, only the Super Flo algorithm includes animated calculation steps.

Furthermore, the upcoming update will introduce a custom API feature, enabling connection to self-created solvers via a RESTful interface.
