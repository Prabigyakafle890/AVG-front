FROM node:20-alpine
WORKDIR /usr/src/app

ARG VITE_API_BASE_URL
ARG VITE_ALLOWED_HOSTS
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_ALLOWED_HOSTS=$VITE_ALLOWED_HOSTS

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

RUN npm run build

# Expose the port
EXPOSE 3001

# Start the server (serve built files using preview)
CMD ["npm", "run", "preview", "--", "--port", "3001", "--host"]
