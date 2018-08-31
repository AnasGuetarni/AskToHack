console.log("\nLoading shellcodes".green);


let Parser = require('rss-parser');
let parser = new Parser();


(async () => {

  let feed = await parser.parseURL('https://www.exploit-db.com/rss-type/?t=shellcode');
  console.log("-> ".yellow + feed.title.yellow + " loaded".yellow);

  feed.items.forEach(item => {
    //console.log(item.title + ':' + item.link)
  });

})();
