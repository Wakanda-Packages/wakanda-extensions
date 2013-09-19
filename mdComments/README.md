Markdown Wakanda Studio Extension
=================================

Allows you to intersperse comments containing markdown documentation in your Javascript code. When a Javascript file is saved in Wakanda Studio, a corresponding markdown file is automatically created from the markdown comments named *js-file-name*.js.md. To facilitate debugging while keeping file sizes down, another corresponding file is created named *js-file-name*.no-md.js with all markdown comments removed. Original Javascript files are never modified. No files are generated when saving a Javascript file containing no markdown comments.

To add a markdown comment, simply begin it with a bar (//|). For a blank markdown line, hit return after the bar. For lines with content, add a space after the bar (to make it more readable in the code) and then enter the line of markdown. The extra space will automaticaly be removed when the markdown file is generated. Its a very handy way of documenting a module's interface so that you or other developers don't have to sift though your code to figure out how to use your module.


Example
-------

This code snippet:

```javascript
//----------------------------------------------------------------------------------------------------// times//----------------------------------------------------------------------------------------------------//| ### times (value)//|//| Multiplies the money amount by the given numeric `value` and returns the result as a new money object.//|//| Examples://|//| ```javascript//| money(24).times(10); // 240.00//|//| var orderAmount = money(100);//| var salesTaxRate = 0.05;//| orderAmount.times(salesTaxRate); // 5.00//| ```//----------------------------------------------------------------------------------------------------Money.prototype.times =	function times (valueToMultiply) {		if (!_.isNumber(valueToMultiply)) {			throw exceptions(new Error("The money times method was passed something other than a number."));		}				return new this.constructor(Math.round(this._valueInCents * valueToMultiply));	};
```

Will produce this in the markdown file:

	### times (value)		Multiplies the money amount by the given numeric `value` and returns the result as a new money 	object.
	Examples:	```javascript	money(24).times(10); // 240.00
		var orderAmount = money(100);	var salesTaxRate = 0.05;	orderAmount.times(salesTaxRate); // 5.00
	```
	
Which will look like this when viewed as markdown:

### times (value)Multiplies the money amount by the given numeric `value` and returns the result as a new money 	object.
Examples:```javascriptmoney(24).times(10); // 240.00
	var orderAmount = money(100);var salesTaxRate = 0.05;orderAmount.times(salesTaxRate); // 5.00
```


License
-------

Licensed under MIT.

Copyright (C) 2013 Jeff Grann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.