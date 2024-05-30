# Frontend for the RelaTree project <!-- omit from toc -->

---

This frontend uses React and Next.js to create a web app to create and update your family tree.

# 1. Installation for development

First install the dependencies:

```bash
npm install
```

Then create a .env file with the following variables:

```env
NEXTAUTH_SECRET=uZenapxLI1YKQsdG2eM717dqJXMze6wvrvTugQnr9uQ=
```

You can generate a secret with the following command:

```bash
openssl rand -base64 32
```

You can then launch the frontend:

```bash
npm run dev
```
