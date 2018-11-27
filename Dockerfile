FROM ubuntu as base

# change the shell to bash
SHELL ["/bin/bash", "-c"]
RUN apt-get update \
    && apt-get install -y -q --no-install-recommands \
    apt-transport-https \
    build-essential \
    curl \
    git \
    libssl-dev \
    wget

ENV NVM_DIR ~/.nvm
ENV NODE_VERSION 8.11.3

# install the nvm to manage node version
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

FROM base as build

WORKDIR /app

CMD ["/bin/echo", "node -v"]