#!/bin/bash
start https://angular-deploiement.web.app
taskkill //F //IM node.exe
json-server --watch db.json
