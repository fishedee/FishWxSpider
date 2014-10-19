#!/bin/sh
pkill phantomjs
./phantomjs main.js 8787 &
ps aux | grep phantomjs
