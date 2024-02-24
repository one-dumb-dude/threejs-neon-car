This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


---

## The Car Scene

1. <b>MeshReflectorMaterial</b> - This created a beautiful ground in this scene, we used a roughness map and a normal map to create the effects.  MeshReflectorMaterial has many attributes.
2. <b>CubeCamera:</b>
    * This essentially creates an environment map out of the scene itself.
    * the 'frames' attribute tells how many frames the CubeCamera should render for. Here we set it to 'Infinity', meaning it should render for each frame
    * Passing in 3d objects as children into CubeCamera exempts them from being rendered in the CubeCamera

---

Node version: 20.10.0
npm version: 10.3.0
