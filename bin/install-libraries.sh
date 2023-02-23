#!/usr/bin/env sh

set -e

libs="`dirname "$0"`/../libs"

installLibrary() {
    (mkdir -p "$libs/$1" && cd "$libs/$1" && wget -O - "$2" | tar -xz --strip-components=1)
}

installLibrary flux-eco-ui-tree https://github.com/flux-eco/flux-eco-ui-tree/archive/refs/tags/v2023-02-23-1.tar.gz
installLibrary flux-eco-ui-tree-state https://github.com/flux-eco/flux-eco-ui-tree-state/archive/refs/tags/v2023-02-23-1.tar.gz
installLibrary flux-eco-ui-tree-element https://github.com/flux-eco/flux-eco-ui-tree-element/archive/refs/tags/v2023-02-23-1.tar.gz
installLibrary flux-eco-ui-state-broadcaster https://github.com/flux-eco/flux-eco-ui-state-broadcaster/archive/refs/tags/v2023-02-23-1.tar.gz