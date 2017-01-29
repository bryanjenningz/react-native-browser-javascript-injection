/**
 * React Native JavaScript injection example
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  WebView,
} from 'react-native';

const injectedString =
`
function el(type, attrs, ...children) {
  var element = document.createElement(type);
  for (var attrKey in attrs) {
    if (attrKey.indexOf('on') === 0) {
      element[attrKey] = attrs[attrKey];
    } else {
      element.setAttribute(attrKey, attrs[attrKey]);
    }
  }
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (['string', 'number'].indexOf(typeof child) >= 0) {
      var text = child;
      child = document.createElement('span');
      child.textContent = text;
    }
    element.appendChild(child);
  }
  return element;
}

var fixedPopup =
  el('div', {
    style: 'position: fixed; bottom: 0; left: 0; right: 0; height: 200px; background-color: cyan; font-size: 34px;',
    onclick: function() { this.parentNode.removeChild(this); },
  },
    'Hello world'
  );
document.body.appendChild(fixedPopup);
`

export default class JavaScriptInjection extends Component {
  render() {
    return (
        <WebView
          source={{uri: 'https://google.com'}}
          style={{marginTop: 20}}
          scalesPageToFit={true}
          injectedJavaScript={injectedString}
          javaScriptEnabled={true}
        />
    );
  }
}

AppRegistry.registerComponent('JavaScriptInjection', () => JavaScriptInjection);
