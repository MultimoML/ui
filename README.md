# UI

Accessable from [multimo.ml](https://multimo.ml).

## Project description

Data visualisation website. Made using Astro, React, TailwindCSS and Plotly.js.

Author: [Miha Krumpestar](https://github.com/mk2376)

Initialized using:
```
npm create astro@latest

npx astro add tailwind
npx astro add node
npx astro add react

npm install nanostores @nanostores/react # State management

npm install @nivo/core @nivo/bar @nivo/sunburst # charting library
npm install papaparse @types/papaparse # Csv parser

npm i @headlessui/react # Component library
npm install react-feather # Icons
```

After cloning the repository, run:
```
npm install
```

Performance testing:
```
lighthouse http://localhost:3000/ --view
```

Upgrading `npm` packages:
```
npm install -g npm-check-updates
ncu
ncu -u
npm i --force
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## License

RSOcena is licensed under the [GNU AGPLv3 license](LICENSE).
