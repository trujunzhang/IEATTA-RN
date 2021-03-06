import tap from 'babel-tap';
import expect from 'expect';
import reactNativeCSS from '../src/index';

tap.test('Parse CSS', (t) => {
  const data = reactNativeCSS`
   section-title {
    font-weight: normal;
    color: #666;
    padding: 5px 10px;
    margin-bottom: 0;
        font-size: 21px;
    line-height: 1.28571em;
}
action-list {
    background: #fff;
    border: 1px solid #ccc;
    border-width: 1px 0;
}
action-item {
    display: block;
    margin: 0 10px;
    border-top: 1px solid #e6e6e6;
}
action {
    margin: 0 -10px;
    padding: 10px;
    color: #333;
    min-height: 24px;
}
photo-box-img {
    border-radius: 4px;
}
h4 {
font-weight: bold;
    font-size: 14px;
    line-height: 1.28571em;
    color: #333;
}

  `;

  console.log('data: ' + JSON.stringify(data));

  t.end();
});

