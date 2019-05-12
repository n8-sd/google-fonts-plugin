'use strict'

import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import GoogleFontsWebpackPlugin from '../src'

const mock = new AxiosMockAdapter(axios)

test('Should replace urls in css with encoded fonts', async () => {
  const googleFonts = new GoogleFontsWebpackPlugin()
  mock.onGet('https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2').reply(200, 'asdf')
  mock.onGet('https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2').reply(200, 'fdsa')
  await expect(googleFonts.encodeFonts(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')).resolves.toBe(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url("data:application/x-font-woff2;base64,YXNkZg==") format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url("data:application/x-font-woff2;base64,ZmRzYQ==") format(\'woff2\');\n' +
    '}\n')
})

test('Should add font-display property with non-encoded fonts', async () => {
  const googleFonts = new GoogleFontsWebpackPlugin({ encode: false })
  await expect(googleFonts.encodeFonts(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')).resolves.toBe(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  font-display: swap;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  font-display: swap;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')
})

test('Should keep as is with non-encoded fonts and empty font-display', async () => {
  const googleFonts = new GoogleFontsWebpackPlugin({
    encode: false,
    fontDisplay: ''
  })
  await expect(googleFonts.encodeFonts(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')).resolves.toBe(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')
})

test('Should keep as is with non-encoded fonts and false font-display', async () => {
  const googleFonts = new GoogleFontsWebpackPlugin({
    encode: false,
    fontDisplay: false
  })
  await expect(googleFonts.encodeFonts(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')).resolves.toBe(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')
})

test('Should keep as is with non-encoded fonts and true font-display', async () => {
  const googleFonts = new GoogleFontsWebpackPlugin({
    encode: false,
    fontDisplay: true
  })
  await expect(googleFonts.encodeFonts(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')).resolves.toBe(
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v16/fIKu7GwZTy_12XzG_jt8eA.woff2) format(\'woff2\');\n' +
    '}\n' +
    '@font-face {\n' +
    '  font-family: \'Roboto\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  src: local(\'Roboto Bold\'), local(\'Roboto-Bold\'), url(https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW1tXRa8TVwTICgirnJhmVJw.woff2) format(\'woff2\');\n' +
    '}\n')
})
