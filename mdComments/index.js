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
	"use strict";

	var docPath;
	var fileContents;
	var i;
	var LINE_ENDING = '\r\n';
	var lines;
	var lineStart;
	var mdCommentPos;
	var mdContents;
	var mdFile;
	var noMDContents;
	var noMDFile;
	var noMDLine;
	var theStream;
	
    function replaceAll (theString, oldString, newString) {
    	return theString.split(oldString).join(newString)
    }

	if (message.source.data[0].extension === 'js') {
		//------------------------------------------------------------------
		// Get the file's path and contents.
		//------------------------------------------------------------------
		docPath = message.source.data[0].path;
		fileContents = message.source.data[0].toString();
		
		//------------------------------------------------------------------
		// Make sure all lines end with CR/LF.
		//------------------------------------------------------------------
		if (fileContents.indexOf(LINE_ENDING) < 0) {
			if (fileContents.indexOf('\r') >= 0) {
				fileContents = replaceAll(fileContents, '\r', LINE_ENDING);
			}
			else {
				fileContents = replaceAll(fileContents, '\n', LINE_ENDING);
			}
		}
		
		//------------------------------------------------------------------
		// Get the individual lines.
		//------------------------------------------------------------------
		lines = fileContents.split(LINE_ENDING);
		
		//------------------------------------------------------------------
		// Get the markdown.
		//------------------------------------------------------------------
		mdContents = '';
		noMDContents = '';

		for (i = 0; i < lines.length; i++) {
			mdCommentPos = lines[i].indexOf('//|');
				
			if (mdCommentPos < 0) {
				noMDContents = noMDContents + lines[i] + LINE_ENDING;
			}
			else {
				lineStart = mdCommentPos + (lines[i].indexOf('//| ') === mdCommentPos ? 4 : 3);
				mdContents = mdContents + lines[i].slice(lineStart) + LINE_ENDING;
				
				noMDLine = lines[i].slice(0, mdCommentPos);
				
				if (noMDLine.trim() !== '') {
					noMDContents = noMDContents + noMDLine + LINE_ENDING;					
				}
			}
		}
	
		//------------------------------------------------------------------
		// Write the files.
		//------------------------------------------------------------------
		if (mdContents !== '') {
			//------------------------------------------------------------------
			// Write the markdown file.
			//------------------------------------------------------------------
			mdFile = File(docPath + '.md'); 
			theStream = new TextStream(mdFile, 'Overwrite');
			theStream.write(mdContents);
			theStream.close();

			//------------------------------------------------------------------
			// Write the non-markdown file.
			//------------------------------------------------------------------
			noMDFile = File(docPath.slice(0, docPath.length - 3) + '.no-md.js'); 
			theStream = new TextStream(noMDFile, 'Overwrite');
			theStream.write(noMDContents);
			theStream.close();
		}
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

