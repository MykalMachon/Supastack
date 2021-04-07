## Connecting Supabase to Supastack

### Cloning The Project

I've created a project that works with this database & the supabase system. It's hosted on github and we can use Git to fork, and then clone it from this URL: https://github.com/MykalMachon/Supastack

1. **Fork Supastack**: You can click the "fork" button at the top of the repo to fork my repository. Now you should be able to clone your own version to your machine

2. **Clone Supastack locally & install deps**: follow the commands below in your command line.

```bash
git clone https://github.com/<your-username>/Supastack
# wait for github to clone the repok
cd ./Supastack
# install dependencies
npm install
```

3. **Setup environment:** You'll need your supabase project URL, and your anon public API key. You can find these in your supabase project, under settings > API. create a file called `.env.local` in the home directory of the repo, paste your supabase project URL and your public anon API into the file as below.

```env
NEXT_PUBLIC_SUPABASE_URL="<your-supabase-project-url>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-public-anon-api-key>"
```

4. **Run your app:** Now you should be able to run your app with the command `npm run dev` in your console.

### Experiment With Your App

Create an account, signin, and try creating posts. You can also try making multiple accounts with different emails so you can like your own posts, and make sure that everything is working properly.
