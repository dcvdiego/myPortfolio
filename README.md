<h2 align="center">
  ✨ MyPortfolio ✨
</h2>

My name is Diego Chuman. I am an aspiring full stack developer and this is my portfolio repository, why not keep it open-source :D.

Remember to install dependencies after cloning it locally.

### Run Development Environment

```bash
yarn dev # npm run dev
```

### Test Production Environment

The `stage` script will build and start a production server.

```bash
yarn stage # npm run stage
```

Alternatively you can run:

```bash
yarn build # npm run build
yarn start # npm start
```

### Static HTML

The `export` script will build the files to be served statically. Note that this comes with some [caveats](https://nextjs.org/docs/advanced-features/static-html-export).

```bash
yarn export # npm run export
```

### CURRENT BUGS

- rotateX repeat does not work in `src/components/Certification/model.tsx` have tried using MotionCanvas (giving another error) and taking out rotateX from transition object
- WordCloud does not load immediately (WebGL context loss), only after navigating from Certifications to Testimonials (hacky fix imminent :) ) This started happening from upgrading to React 18, half fixed it by doing dynamic imports but typescript does not like it (even though it is the same as the model.tsx for certifications)
- fix all any so that we do not generalize
