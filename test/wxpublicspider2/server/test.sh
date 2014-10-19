#!/bin/sh

#test searchpublic
#curl -d "{\"fun\":\"SearchPublic\",\"data\":\"123\"}" localhost:8787
#curl -d "{\"fun\":\"SearchPublic\",\"data\":\"小道消息\"}" localhost:8787
curl -d "{\"fun\":\"GetPublic\",\"data\":\"/gzh?openid=oIWsFt86NKeSGd_BQKp1GcDkYpv0\"}" localhost:8787
