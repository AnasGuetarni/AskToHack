let Parser = require('rss-parser');
let parser = new Parser();


module.exports = {

  shellcode_latest: function(callback){
    let res = new Array();

    (async () => {

      let feed = await parser.parseURL('https://www.exploit-db.com/rss-type/?t=shellcode');
      let i = 0;

      feed.items.forEach(item => {
        if (i == 6) callback(res);
        let link_ = item.link.split('/');
        res.push({ name: item.title, link: link_[4] });
        i++
      });

    })();
  }
}
