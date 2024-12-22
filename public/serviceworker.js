/*! For license information please see serviceworker.js.LICENSE.txt */
// console.log("hii am sourabh");
// let var1;
// console.log(var1);
// importScripts(
//   `https://cdn.moengage.com/release/${var1}/serviceworker_cdn.min.latest.js`
// );

// self.addEventListener("install", function (event) {
//   console.log("Service Worker installing.");
// });

// self.addEventListener("activate", function (event) {
//   console.log("Service Worker activating.");
// });
// self.addEventListener("message", function(event) {
//   var1 = event.data.var1; // Set var1 when receiving the message
//   console.log("Received var1 in Service Worker:", var1);
// });
// console.log("accesss variable",var1);



// // self.addEventListener("fetch", function (event) {
// //   console.log("Fetching:", event.request.url);
// // });


console.log("hii am sourabh");
let hasrun=false;

let var1;

// Initial value of var1 will be undefined
console.log("Initial var1:", var1);

self.addEventListener("install", function (event) {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activating.");
});


// Listen for messages from the main thread to set var1
if(hasrun==false)
{
  self.addEventListener("message", function(event) {
    console.log(event)
    var1 = event.data.var1;
    console.log("Received var1 in Service Worker:", var1);
     hasrun=true;
    // Now that var1 is set, import the script
    importScripts(
      `https://cdn.moengage.com/release/${var1}/serviceworker_cdn.min.latest.js`
    );
  
    console.log("access variable after importScripts:", var1);
  });
}


