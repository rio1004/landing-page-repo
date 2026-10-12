import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Exercise the actual TS/TSX source without adding a test-runner dependency.
const require = createRequire(import.meta.url);
function loadSource(path, imports = {}) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports, URL,
    require: name => imports[name] ?? require(name),
  });
  return exports;
}
const utils = loadSource('../src/utils/socialLinks.ts');
const { default: SocialLinks } = loadSource('../src/components/SocialLinks.tsx', {
  '../utils/socialLinks': utils,
});
const render = links => renderToStaticMarkup(React.createElement(SocialLinks, { links, businessName: 'Test Café' }));
const link = (url, platform = 'instagram', label = 'Instagram') => ({ platform, label, url });

assert.equal(render(undefined), '');
assert.equal(render([]), '');
const invalid = ['', '/profile', '//example.com', 'javascript:alert(1)', 'data:text/html,test', 'mailto:test@example.com', 'ftp://example.com', 'not a url', 'https://', 'https://user:password@example.com'];
for (const url of invalid) {
  assert.equal(utils.socialDestination(url), undefined, url);
  assert.equal(render([link(url)]), '', url);
}
assert.equal(render([link('https://example.com', 'x', '  ')]), '');
assert.equal(utils.socialDestination(' https://example.com/profile '), 'https://example.com/profile');
assert.equal(utils.socialDestination('http://example.com'), 'http://example.com/');
const platforms = ['facebook', 'instagram', 'tiktok', 'youtube', 'x', 'linkedin', 'pinterest', 'link', 'unknown', ' Instagram '];
for (const platform of platforms) {
  const html = render([link('https://example.com/profile', platform, platform.trim())]);
  assert.match(html, /href="https:\/\/example.com\/profile"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /opens in a new tab/);
  assert.match(html, /<svg aria-hidden="true"/);
  assert.match(html, /<h2 id="social-heading"/);
}
const mixed = render([link('javascript:alert(1)'), link('https://example.com/profile')]);
assert.equal((mixed.match(/<a /g) ?? []).length, 1);
assert.equal(mixed.includes('javascript:'), false);
const generic = render([link('https://example.com', 'unknown', '<Profile>')]);
assert.match(generic, /&lt;Profile&gt;/);
assert.equal(render([link('https://example.com', 'link', '<Profile>')]), generic);
console.log('Social-link checks passed: URL validation, configured links, all icons, generic fallback, labels, safe new tabs, and missing/invalid-link states.');
