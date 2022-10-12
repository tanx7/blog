---
title: docker多阶段构建
lastUpdated: true
---

## 示例
```dockerfile
# Build the manager binary
FROM golang:1.17 as builder

WORKDIR /workspace
# Copy the Go Modules manifests
COPY go.mod go.mod
COPY go.sum go.sum
# cache deps before building and copying source so that we don't need to re-download as much
# and so that source changes don't invalidate our downloaded layer
RUN export GOPROXY="https://goproxy.cn,direct" &&\
    go mod download

# Copy the go source
COPY main.go main.go
COPY api/ api/
COPY controllers/ controllers/
COPY k8sutils/ k8sutils/

# Build
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=on go build -a -o manager main.go

FROM alpine:3.16.2 as etcs

RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# Use distroless as minimal base image to package the manager binary
# Refer to https://github.com/GoogleContainerTools/distroless for more details
FROM superdowell/distroless-static:nonroot
WORKDIR /
COPY --from=builder /workspace/manager .
COPY --from=etcs /etc/localtime /etc/timezone /etc/
USER 65532:65532

ENTRYPOINT ["/manager"]


```
