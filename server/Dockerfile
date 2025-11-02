
# ---------- STAGE 1: Build ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript to JavaScript
RUN npm run build


# ---------- STAGE 2: Runtime ----------
FROM node:20-alpine

WORKDIR /app

# Copy only built files and necessary assets
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose application port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]