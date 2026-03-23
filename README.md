# University of Glasgow CSS Framework

## Description
This project provides users with a framework for designing websites in accordance with the University of Glasgow's style and structure guide. It features user Sassy CSS, JavaScript, and a thorough testing suite.

This makes designing consistent webpages easy - using our framework means all your design components will be laid out and styled correctly.

The Design Guide website can be found here: [this link](https://design.gla.ac.uk/822fb39f4/p/72d586-university-of-glasgow-design-system)

## Getting Started

The project is written in SCSS and JavaScript. This means we can make use of control structures to define classes. This however means that the project must be compiled into a CSS file and a master JavaScript file before use. This can be done by installing Sass from [this link](https://sass-lang.com/install/) to compile the SCSS, and esbuild from [this link](https://esbuild.github.io/) to make the JavaScript file. On these sites there are download instructions for whatever package manager is preferred.  

To begin all dependencies must be installed.

    npm install

Once Sass is installed the SCSS files must be compiled. This can be done by calling this script.

    npm run build:css

This will create the compiled CSS file in the distribution folder from all of the SCSS files. 

Once esbuild is installed, the JavaScript master file must be compiled. This can be used by running the following script.
	
	npm run build:js

This will create a compiled framework.js file in distribution from the framework.js file in src/js which imports all the other JavaScript files.

## Setting up Tests

1. Make sure you are running the latest compiled version of the main.scss file.
2. Find and launch the index.html file found in the tests folder.

## StyleLint Tests

1. In the project root folder, open cmd
2. Run the following: npm install to install all dependancies from package.json
3. Run the following: npm run lint:scss

## Support
Contact information for support can be found at [this link](https://design.gla.ac.uk/822fb39f4/p/6295aa-contact)

## Authors and Acknowledgment
Developers are as follows:

Razvan Tonca
Euan Galloway
Miroslav Boudny
Nelson Hearfield
Keiran Walker
Ethan Barry


## Licence
MIT Licence

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.