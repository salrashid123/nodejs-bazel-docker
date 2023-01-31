## Deterministic builds with nodejs + bazel + docker

Simple helloworld about how to build `nodeJS` deterministic container images using `bazel`.

This similar to 

- [Deterministic builds with go + bazel + grpc + docker](https://github.com/salrashid123/go-grpc-bazel-docker)

except that the application is a simple http client/server (i.,e not `gRPC`)

(The reason for this repo is i needed to generate a nodejs container app using bazel and didn't find the documentation that straightforward (i.,e building nodejs apps in bazel has several nuances).

you should expect the following image hashes if using the same baze and node toolchains

* server: `node_server@sha256:3bc3eacfeffcf4c656e609131a0c26ba4f9f7469df6dcf048b0e433b31038890`
* client: `node_client@sha256:8174e52e2cb837e9bc9b5299c5e0ec6b98b10882f05778ff83bdcc702f86d240`

Anyway, for reference, see:

- [Building deterministic Docker images with Bazel](https://blog.bazel.build/2015/07/28/docker_build.html)
- [Create Container images with Bazel](https://dev.to/schoren/create-container-images-with-bazel-47am)
- [rules_docker](https://github.com/bazelbuild/rules_docker)

---

### Setup

You'll need `bazel` ofcourse and `docker` too to actually run the image locally if you want to.

You should be able to use any bazel version but i used

```
$ bazel verson
    Build label: 5.3.2
```

#### Server

To build the server and run locally

```bash
cd server/
bazel run :server
```

To build and run the container image

```bash
bazel run :server_image
docker run -p 8080:8080 us-central1-docker.pkg.dev/builder-project/repo1/node_server:server_image
```

with google cloud build

```bash
gcloud builds submit .

export PROJECT_ID=$(gcloud config list --format="value(core.project)")
docker pull us-central1-docker.pkg.dev/$PROJECT_ID/repo1/node_server
```


#### Client

To build the client and run locally

```bash
cd client/
bazel run :client
```

To build and run container image

```bash
bazel run :client_image
docker run --net=host us-central1-docker.pkg.dev/builder-project/repo1/node_client:client_image
```

with google cloud build

```bash
gcloud builds submit .

export PROJECT_ID=$(gcloud config list --format="value(core.project)")
docker pull us-central1-docker.pkg.dev/$PROJECT_ID/repo1/node_server
```