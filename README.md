
# SpaceScape
The SpaceScape project is a prototype that utilizes Replicate's AI model to generate interior design images. It allows users to input various parameters and receive AI-generated designs based on their preferences. The project is built using Next.js, and features a clean, user-friendly interface, focusing on an enhanced user experience.

Key aspects of SpaceScape include:

AI Integration: It leverages Replicate's AI model to create custom interior designs, allowing for real-time generation of images based on user input.
UI/UX: The project emphasizes a seamless design experience, with a well-thought-out, minimalistic layout.
Guest Login: The project includes a guest login feature where users can generate one image for free, using rate limiting and IP-based validation to manage access.










## Documentation



https://replicate.com/jagilley/controlnet-hough

https://next-auth.js.org/

https://www.mongodb.com/

https://ui.aceternity.com/

https://v0.dev/


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


# .env (do not commit this file to version control)
REPLICATE_API_TOKEN=<your_replicate_api_token_here>

MONGODB_URI=<your_mongodb_uri_here>

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_public_stripe_key_here>

STRIPE_SECRET_KEY=<your_secret_stripe_key_here>

NEXT_PUBLIC_BASE_URL=http://localhost:3000 || Production URL
GOOGLE_CLIENT_ID=<your_google_client_id_here> 

GOOGLE_CLIENT_SECRET=<your_google_client_secret_here>

NEXTAUTH_SECRET=<your_nextauth_secret_here>

NEXT_PUBLIC_GA_ID=<your_google_analytics_id_here>

NEXTAUTH_URL=http://localhost:3000 || production URL
## Features

- Personalization (custom interior designs)
- AI-powered (design generation)
- Ease (simple user interface)
- Guest-access (free trial option)
- Real-time (image generation)
- Security (IP-based login)
- Limited-access (rate-limiting for guests)
- No-signup (guest mode option)
- Interactive (image customization)
- Mobile-friendly (responsive design)



## 🚀 About Me
I'm a full stack developer...


# Hi, I'm Sankalp! 👋


## Installation

Install my-project with npm

```bash
  npx create-next-app@latest
  cd project 
  npm install
  get all enviroment variable keys
 

```
    
## License

This project, SpaceScape, is licensed under the following terms:

You are free to use this software for personal and non-commercial purposes. Redistribution, modification, or commercial use of the application is not allowed without explicit permission from the author.



## Run Locally

Clone the project

```bash
git clone https://github.com/Sankalpcreat/Spacescape.git
```

Go to the project directory

```bash
cd my-project
```

Install dependencies

```bash
npx create-next-app@latest
```

Start the server

```bash
  npm run dev
```





## Tech Stack

**Client:** Next.js, React, TailwindCSS

**Server:** Node.js, Express, MongoDB (for the database), NextAuth for authentication

