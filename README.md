# :fire: Yelp-Camp

Web development practice project.

The whole web app allows registered users post/edit/delete/comment campgrounds.
Users only have the authorization for their own posts or comments.

- Logic: NodeJS, ExpressJS
- Layout: Semantic UI
- Database: MongoDB Atlas
- Deployment: Heroku

## :sparkles: Looking

### Landing Page
![landing](/public/images/001.png)

### Show page
![main](/public/images/002.png)

### Comment
![comments](/public/images/003.png)

## :ballot_box_with_check: To-do
- [ ] Admin Role
- [ ] User Profile
- [ ] Image Upload
- [ ] Password Reset
- [ ] Refactor callbacks with Async/Await
- [ ] Message Notifications
- [ ] Embed Google Map
- [ ] Comment on the show page
- [ ] Ratings or like button
- [ ] Try MomentJS to display time

---

## :scroll: Develop history (check each branch)

### **Version 1**: 
- Skeleton using NodeJS and ExpressJS;
- Simple layout using Bootstrap 4;
- No database...

### **Version 2**: 
- Skeleton using NodeJS and ExpressJS;
- Update the layout of Version1 a little bit;
- Use MongoDB as the database (use mongoose to connect)

### **Version 3**:
- Data association;
- Nested comment RESTful route;
- Use separate files for all the Models needed in MongoDB;
- A ```seed.js``` file to initialize the database;
- Styling all the pages (using Semantic UI, just because it's cute...)

### **Version 4**:
- Add Authentication;
- Add simple logic for navbar related to login status

### **Version 5**:
- Refactoring routes;
- User Association with comment and campground;
- Campground and comment update and destroy;
- Campground and comment authorization;
- Other UI Improvement...

### **Version 6**:
- Refactoring middleware;
- Add flash messages;
- Styling the landing page using [background-slider](https://github.com/nax3t/background-slider);
- Add price feature for campground
