/**
 * ---------------------------------------------------------------------------------------------------------------------
 * Deploys to S3
 * 1. update the WebsiteConfiguration (mainly config the 301 and 302 redirects)
 * 2. update the objects in S3.
 * ---------------------------------------------------------------------------------------------------------------------
 */

const fs = require('fs'),
  keys = JSON.parse(fs.readFileSync('secret/rootkey.json', 'utf8')),
  redirects302 = JSON.parse(fs.readFileSync('config/redirects.json', 'utf8')),
  maxAge = 'max-age=1209600', // 14 days.
  bucketName = 'vanlosophy.com';

var s3 = require('s3'),
  sourceDir = 'public',
  progress = 0,
  client,
  routingRulesParams,
  params,
  promises = [],
  uploader;

// Create the s3 client & configure it
console.log('Creating client...');
client = s3.createClient({
  s3Options: {
    accessKeyId: keys.AWSAccessKeyId,
    secretAccessKey: keys.AWSSecretKey,
    region: 'us-west-1',
  },
});

//try 200 redirects, and I hit the 50 routing rules limit :(
/*
var twoHundredsRedirects = [];
for(var i = 0; i < 200; i++){
  moreDirects.push({
     "Redirect": {
      "HostName": "vanlosophy.com",
      "HttpRedirectCode": "302",
      "ReplaceKeyWith": ""
    },
    "Condition": {
      "KeyPrefixEquals": "page" + i
    }
  })
}
*/

// update the WebsiteConfiguration.
// Noticed! WebsiteConfiguration has a 50 routing rules limit, so we only use it for 302 redirects.
routingRulesParams = {
  Bucket: bucketName, 
  ContentMD5: "", 
  WebsiteConfiguration: {
    ErrorDocument: {
      Key: "404.html"
    }, 
    IndexDocument: {
      Suffix: "index.html"
    },
    RoutingRules: redirects302
  }
};
promises.push(new Promise((resolve, reject) => {
  console.log('Updating 302 routing rules...');
  client.s3.putBucketWebsite(routingRulesParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    console.log('302 Routing rules update finished.');
    resolve();
  });
}));


// update the objects in S3.
syncingParams = {
  localDir: sourceDir,
  deleteRemoved: true, // default false, whether to remove s3 objects
                       // that have no corresponding local file.
  defaultContentType: 'text/html',

  s3Params: {
    Bucket: bucketName,
    CacheControl: maxAge,
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};
promises.push(new Promise((resolve, reject) => {
  console.log('Syncing files with S3...');
  // Initiate the upload
  uploader = client.uploadDir(syncingParams);

  uploader.on('error', function(err) {
    console.error('Unable to upload:', err.stack);
    reject();
  });

  uploader.on('progress', function() {
    var thisProgress;

    if (uploader.progressAmount && uploader.progressTotal) {
      thisProgress = Number(((uploader.progressAmount / uploader.progressTotal) * 100).toFixed(0));

      // Log for every 5% of progress
      !(thisProgress % 5) &&
        thisProgress > progress &&
        (console.log(progress + '% completed'), progress = thisProgress);
    }
  });

  uploader.on('end', function() {
    console.log('Syncing completed!');
    resolve();
  });
}));


// update for both routing rules and object syncing is done.
Promise.all(promises).then( v => {
  // work around of the 50 routing rules limit
  // it has to take place after dir sync is done, otherwise this will be overwrited
  var promises301 = [];
  promises301.push(new Promise((resolve, reject) => {
    var dummyParams = {
      localFile: "config/dummy.html",
     
      s3Params: {
        Bucket: bucketName,
        Key: "limit50.html",
        WebsiteRedirectLocation: "/features"
        // other options supported by putObject, except Body and ContentLength. 
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
      },
    };
    var uploader = client.uploadFile(dummyParams);
    uploader.on('error', function(err) {
      console.error("unable to upload:", err.stack);
      reject();
    });
    uploader.on('progress', function() {
      console.log("progress", uploader.progressMd5Amount,
                uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function() {
      console.log("301 redirect done uploading");
      resolve();
    });
  }));

  Promise.all(promises301).then( v => {
    console.log('All taskes completed!');
    process.exit();
  }).catch(reason => { 
    console.log(reason);
    process.exit();
  });
}).catch(reason => { 
  console.log(reason);
  process.exit();
});
