/* Copyright (c) 4D, 2012
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* The Software shall be used for Good, not Evil.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

var actions;
actions = {};


//----------------------------------------------------------------------------------------------------
// onFileSave
//----------------------------------------------------------------------------------------------------
actions.onFileSave= function onFileSave(message) {
	if (message.source.data[0].extension === 'js') {
		//------------------------------------------------------------------
		// Generate the smaller code.
		//------------------------------------------------------------------
		var jsp = require("./lib/parse-js");
	    var pro = require("./lib/process");
	    var consolidator = require("./lib/consolidator");
		var ast = jsp.parse(message.source.data[0].toString()); // parse code and get the initial AST
		ast = pro.ast_mangle(ast); // get a new AST with mangled names
		ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
		var smaller_code = pro.gen_code(ast); // compressed code here

		//------------------------------------------------------------------
		// Write the uglified file.
		//------------------------------------------------------------------
		var uglifiedFile = File(message.source.data[0].path.slice(0, message.source.data[0].path.length - 3) + '.min.js'); 
		var theStream = new TextStream(uglifiedFile, 'Overwrite');
		theStream.write(smaller_code);
		theStream.close();
	}
	return true;
};


//----------------------------------------------------------------------------------------------------
// handleMessage
//----------------------------------------------------------------------------------------------------
exports.handleMessage = function handleMessage(message) {
	"use strict";

	var actionName;

	actionName = message.action;

	if (!actions.hasOwnProperty(actionName)) {
		studio.alert("I don't know about this message: " + actionName);
		return false;
	}
	
	actions[actionName](message);
};

