installing the dependenices 
--> npm i

starting the applicatiom 
--> npm start


// add post 
curl --location --request POST 'http://localhost:8000/api/post/add-post' \
--form 'name="sunflower"' \
--form 'category="flower"' \
--form 'image=@"/home/rizwan/Documents/b-jelt/restoap assets/mandi.jpg"'

// delete post 

curl --location --request DELETE 'http://localhost:8000/api/post/delete-post?id='

// update post 


// get post 
curl --location --request GET 'http://localhost:8000/api/post/posts?page=1&limit=5&name=sunflower'

// post like 
curl --location --request PUT 'http://localhost:8000/api/post/like-post?user=6596a9180a2d5c53749e989c&id=6596a0a975a0c90665bb1789'

// comment 

curl --location --request PUT 'http://localhost:8000/api/post/comment-post?user=6596a9180a2d5c53749e989c&id=6596a0a975a0c90665bb1789' \
--header 'Content-Type: application/json' \
--data-raw '{
    "commentText":"asfasd"
}'
