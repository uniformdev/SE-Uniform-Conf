# UniformConf Next.js Starter

This is a [Next.js](https://nextjs.org/) application with enhancers for multiple CMS systems.

## Getting Started

### Install packages

```shell
pnpm install
```

### Import CMS Content

Import the relevant CMS export into your CMS. 

Import help: https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/

Path:
```shell
data/contentful/contentful-export-siy7a16chotr-master-2023-01-10T14-52-24.json
```

### Create a Uniform project

Create an empty project at uniform.app

### Setup Environment Variables

Create your .env file based on the example provided (.env.example) and remove the keys related to CMS platforms that you're not using.

### Import and publish Uniform packages and Uniforms Intent Manifest

```shell
pnpm run push
```

### [Optional] Update Project Map in env file if necessary.
If you are not importing the Project Map definition from this project you need to setup your own Project Map. In your Uniform Project navigate to Settings > Canvas Settings > scroll down to the <strong>Project map</strong> section. 
Copy the ID and add it to <strong>UNIFORM_PROJECT_MAP_ID</strong> in the .env file.
### Setup Preview
Add a value to <strong>UNIFORM_PREVIEW_SECRET</strong> in the .env file. (Remember to save the file!)

In your Uniform Project navigate to Settings > Canvas Settings. 
If you just want to run everything with default settings, add
```shell
http://localhost:3210/api/preview?secret=previewsecret_from_env_file
```
to the <strong>Preview Configuration</strong>
### [Optional] Add 1 or more integrations to your project

Optionally add 1 or more relevant integrations to your Uniform project.

### Run the development server

```shell
pnpm run dev
```

Open <http://localhost:3210> with your browser to see the result.
