var socketjs = require('sockjs');
var express = require('express');
var app = express();
var io = sockjs.createServer({});
var chokidar = require('chokidar');
var fs = require('fs');
