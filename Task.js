let http=require('http');
let fs = require('fs');

fs.writeFile("read.txt", "added text", (err) => {
    if (err) throw err;
    console.log("file created")
})
http.createServer((req, resp) => {
  if (req.url === "/readfile") {
    let data = fs.readFileSync("read.txt").toString();
    resp.write(data);
  }
  else if (req.url === "/writefile") {
    fs.writeFile("read.txt", "added text", (err) => {
      if (err) throw err;
      resp.write("file write succesfully");
    //   resp.write(data);
    });
  }
  else if (req.url === "/deletefile") {
    fs.unlink("read.txt", (err) => {
      if (err) throw err;
      resp.write("file deletd successfully");
    //   resp.write(data);
    });
  }
  else if (req.url === "/appendfile") {
    // fs.appendFile('read.txt', '\nAppending to file', (err) => { if (err) throw err; console.log("Appended") })
    fs.appendFile("read.txt", "hey how are you!!!!!!", (err) => {
        if (err) throw err; console.log("Appended") 
    //   resp.write(data);
    })
  }

  else if (req.url === "/renamefile") {
    fs.rename("read.txt", "read-new.txt", (err) => {
      if (err) throw err;
    //   resp.write("file renamed succesully");
    //   resp.write(data);
    });

  }
  resp.end();
  
}).listen(5000);
console.log("server work on 5000");
