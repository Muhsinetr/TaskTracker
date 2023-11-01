self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open("static").then(cache=>{
            return cache.addAll(["./","style.css","media.css","script.js","images/backbtn.png","images/Color.png" ,"images/close-btn.png","images/date.png","images/delete.png","images/down-arrow.png","images/to-do-list 512x512.png","images/to-do-list160x160.png","images/edit.png","images/img-1 (1).png","images/img-1 (2).png","images/img-1 (3).png","images/img-1 (4).png","images/menuBar.png","images/pending.png","images/plusBtn.png","images/right-arrow.png"]);
        })
    )
})

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request)
        })
    )
})