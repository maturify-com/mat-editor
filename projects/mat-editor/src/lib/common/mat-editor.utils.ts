/**
 * Enable or disable toolbar based on configuration
 *
 * @param value toolbar item
 * @param toolbar toolbar configuration object
 */
export function canEnableToolbarOptions(value: string, toolbar: any): boolean {
  if (value) {
    if (toolbar['length'] === 0) {
      return true;
    } else {
      const found = toolbar.filter((array) => {
        return array.indexOf(value) !== -1;
      });

      return found.length ? true : false;
    }
  } else {
    return false;
  }
}

/**
 * Set editor configuration
 * @param value configuration via [config] property
 * @param matEditorConfig default editor configuration
 * @param input direct configuration inputs via directives
 */
export function getEditorConfiguration(value: any, matEditorConfig: any, input: any): any {
  for (const i in matEditorConfig) {
    if (i) {
      if (input[i]) {
        value[i] = input[i];
      }
      if (!value.hasOwnProperty(i)) {
        value[i] = matEditorConfig[i];
      }
    }
  }
  return value;
}

/**
 * Return vertical if the element is the resizer property is set to basic
 *
 * @param resizer type of resizer, either basic or stack
 */
export function canResize(resizer: string): any {
  if (resizer === 'basic') {
    return 'vertical';
  }
  return false;
}

/**
 * Save selection when the editor is focussed out
 */
export function saveSelection(): any {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.getSelection && document.createRange) {
    return document.createRange();
  }
  return null;
}

/**
 * Restore selection when the editor is focussed in
 *
 * @param range saved selection when the editor is focussed out
 */
export function restoreSelection(range): boolean {
  if (range) {
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return true;
    } else if (document.getSelection && range.select) {
      range.select();
      return true;
    }
  } else {
    return false;
  }
}
