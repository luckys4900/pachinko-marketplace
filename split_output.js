const fs = require('fs');
const content = fs.readFileSync('c:/Users/user/Desktop/cursor/pachinko/build_out.txt', 'utf8');
fs.writeFileSync('c:/Users/user/Desktop/cursor/pachinko/build_part1.txt', content.slice(0, 2000));
fs.writeFileSync('c:/Users/user/Desktop/cursor/pachinko/build_part2.txt', content.slice(2000, 4000));
fs.writeFileSync('c:/Users/user/Desktop/cursor/pachinko/build_part3.txt', content.slice(4000));
