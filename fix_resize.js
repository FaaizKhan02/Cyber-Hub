const fs = require('fs');
let script = fs.readFileSync('script.js', 'utf8');
script = script.replace(
    'window.scrollTo({ top: 0, behavior: "smooth" });',
    'window.dispatchEvent(new Event("resize")); window.scrollTo({ top: 0, behavior: "smooth" });'
);
fs.writeFileSync('script.js', script);
console.log('Fixed SPA resize zero-dimension map issue!');
