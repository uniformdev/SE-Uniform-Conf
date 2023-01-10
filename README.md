# UniformConf Next.js Starter

This is a [Next.js](https://nextjs.org/) application with enhancers for multiple CMS systems.

## Getting Started

### Install packages

```shell
pnpm install
```

### Import CMS Content

Import the relevant CMS export into your CMS. 

Path:
```shell
data/contentful/contentful-export-siy7a16chotr-master-2023-01-10T14-52-24.json
```

### Create a Uniform project

Create an empty project at uniform.app

### Setup Environment Variables

Make a .env file based on the example provided (.env.example) and remove the keys related to CMS platforms that you're not using.

### Import Uniform packages

```shell
uniform context enrichment push ./data/context/enrichments
uniform context signal push ./data/context/signals

uniform canvas component push ./data/components
uniform canvas composition push ./data/compositions

uniform project-map definition push ./data/project-map/definition
uniform project-map node push ./data/project-map/nodes
```

### Publish Manifest and Canvas

- Go into your Uniform project and publish the Context manifest (Project -> Personalization -> Publish).
- Go into your Uniform project and publish the different compositions (Project -> Canvas -> Compositions -> Publish each composition).

OR

Run these two commands in a terminal from the root directory of the project:
```shell
uniform canvas composition publish --all
uniform context manifest publish
```

### Run the development server

```shell
pnpm run dev
```

Open <http://localhost:3210> with your browser to see the result.
