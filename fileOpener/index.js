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
// openFile
//----------------------------------------------------------------------------------------------------
actions.openFile = function openFile() {
	"use strict";
	
	var i;
	var openedFile;
	var selectedItems;
	
	function openFile (POSIXFilePath) {
		var theWorker;
	
		if (os.isWindows) {  // Windows platform
			theWorker = new SystemWorker('cmd.exe /C "' + toWindowsPath(POSIXFilePath) + '"');
			theWorker.wait(2000);
		}
		else {  // Mac or Linux platform
			theWorker = new SystemWorker('open ' + POSIXFilePath);
			theWorker.wait();
		}
	}
	
	function toWindowsPath (POSIXPath) {
		return POSIXPath.replace(/\//g, "\\");
	}
	
	selectedItems = studio.currentSolution.getSelectedItems( );
	
	openedFile = false;
	
	for (i = 0; i < selectedItems.length; i++) {
		openFile(selectedItems[i].path);
		openedFile = true;
	}
	
	if (!openedFile) {
		studio.alert('Select one or more files to open, and then try again.');
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

