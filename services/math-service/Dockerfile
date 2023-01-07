# FROM: https://turbo.build/repo/docs/handbook/deploying-with-docker

FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /service
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=math-service --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /service

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /service/out/json/ .
COPY --from=builder /service/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project and its dependencies
COPY --from=builder /service/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=services

FROM node:alpine AS runner
WORKDIR /service

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /service .

CMD node service/math-service/dist/index.js