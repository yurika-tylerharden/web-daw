# Web DAW / daste-tech.com

Web DAW is a web-based application for managing and processing audio stems, songs, and band members. It leverages Cloudflare Workers, R2 storage, and D1 database for backend functionality, and is built with React for the frontend.

## Features

- **Band Management**: Add, update, and remove band members.
- **Song Management**: Create, update, and delete songs.
- **Stem Management**: Upload, list, and delete audio stems stored in R2.
- **Database Integration**: Uses D1 for managing songs and stems metadata.
- **React Frontend**: A responsive and interactive user interface.


## API Endpoints

Refer to [api-functions.md](api-functions.md) for detailed API documentation. Below is a summary:

### Band API
- `GET /api/band` - List members
- `POST /api/band` - Add a new member
- `PATCH /api/band/:id` - Update a member
- `DELETE /api/band/:id` - Remove a member

### Songs API
- `GET /api/songs` - List songs
- `POST /api/songs` - Create a new song
- `GET /api/songs/:id` - Get a single song
- `PUT /api/songs/:id` - Update a song
- `DELETE /api/songs/:id` - Remove a song

### Stems API
- `GET /api/stems` - List stems in R2
- `GET /api/stems/:key` - Fetch a single file
- `DELETE /api/stems/:key` - Remove a file from R2

## Secrets
Keys are stored as environmental variables in for the R2 object storage and D1 database.

## Setup Instructions

### Prerequisites
- Node.js and npm
- Cloudflare Wrangler CLI

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-repo/web-daw.git
cd web-daw
```
2. Install dependencies:
```bash
npm install
```
**Development**
Start the React development server:
```bash
npm start
```
3. Start the Cloudflare Workers development server:
```bash
wrangler pages dev build
```
**Build**
To build the React app for production:
```bash
npm run build
```
**Deployment**
Publish the Cloudflare Worker:
```bash
wrangler publish
```
**Database Setup**
To initialize the D1 database schema:
```bash
wrangler d1 execute web-daw --file [schema.sql](http://_vscodecontentref_/0)
```
**R2 Bucket Setup**
Create an R2 bucket:
```bash
wrangler r2 bucket create web-daw-dev
```
List objects in the bucket:
```bash
wrangler r2 object list web-daw
```

