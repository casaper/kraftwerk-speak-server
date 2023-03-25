# Kraftwerk Speak Server

## Setup

You need Google Application Default Credentials (ADC) to authenticate with `@google-cloud/text-to-speech`. See the [GoogleCloud documentation about this](https://cloud.google.com/text-to-speech/docs/libraries?hl=en#client-libraries-install-nodejs)

In the end you'll get a JSON file from Google to which you needd to set a environment variable `GOOGLE_APPLICATION_CREDENTIALS` with absolute path to the ADC file.

### Redis for caching

The server caches the responses with redis. To have a local instance running, you can just start one with docker-compose:

```sh
$ docker-compose up -d
```

### Install node dependencies with pnpm

```sh
$ pnpm install
$ pnpm run speak-server:serve:dev
```
