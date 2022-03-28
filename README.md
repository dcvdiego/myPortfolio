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

- In ExperienceApp, there is a bug in that the character/camera can go through the tunnel, need to add boxes to limit movement
- Figure out how to do something when first loop ends so it goes back to being Idle!
