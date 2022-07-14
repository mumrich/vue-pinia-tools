#!/bin/bash

cd ./Vue.PiniaTools.Host

dotnet watch \
    -- \
    run -c Debug

cd ..
