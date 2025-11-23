const bookmarkNAME=document.getElementById('bookmark-name');
const bookmarkURL=document.getElementById('bookmark-url');
const submitBTN=document.getElementById('add-btn');
const list = document.getElementById('bookmark-list');

document.addEventListener('DOMContentLoaded',loadBookmark);

submitBTN.addEventListener('click',function() {
    const name =bookmarkNAME.value.trim();
    const url = bookmarkURL.value.trim();
    if(!name || !url){
        alert("please enter both bookmark (name,url)");
        return;
    }else{
        if(!url.startsWith("http://")&& !url.startsWith("https://")){
            alert("please enter valid url starting with http:// or https://");
            return;
        }else{
            addBookmark(name,url);
            saveBookmark(name,url);
            bookmarkNAME.value="";
            bookmarkURL.value="";
        }
    }
});

function addBookmark(bookname,url){
    const li=document.createElement("li");
    const link = document.createElement("a");
    link.href=url;
    link.textContent=bookname;
    link.target="_blank"; // to open it in a new tab 
    //to create the remove button to each book mark 
    const removeButton = document.createElement("button");
    removeButton.textContent="Remove";
    removeButton.addEventListener('click',function(){
        list.removeChild(li);
        removeBookmarkFromStorage(bookname,url);
    })
    li.appendChild(link);
    li.appendChild(removeButton);
    list.appendChild(li);   
}

function getBookmarkFromstorage(){
    const bookmarks=localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(bookmarkname,url){
    const bookmarks=getBookmarkFromstorage();
    bookmarks.push({bookmarkname,url});
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));

}

function loadBookmark(){
    const bookmarks=getBookmarkFromstorage();
    // here we will add the name and the url for each load of the project to make it const every time you load the page  
    bookmarks.forEach((bookmark)=> addBookmark(bookmark.name,bookmark.url));

}

function removeBookmarkFromStorage(bookmarkname,url){
    let bookmarks=getBookmarkFromstorage();
    bookmarks=bookmarks.filter((bookmark)=> bookmark.name !==bookmarkname || bookmark.url !== url );
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}