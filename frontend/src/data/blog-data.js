// // electronic
// import blog_1 from "@assets/img/blog/blog-1.jpg";
// import blog_2 from "@assets/img/blog/blog-2.jpg";
// import blog_3 from "@assets/img/blog/blog-3.jpg";
// // fashion
// import blog_4 from '@assets/img/blog/2/blog-1.jpg';
// import blog_5 from '@assets/img/blog/2/blog-2.jpg';
// import blog_6 from '@assets/img/blog/2/blog-3.jpg';
// // blog postbox 
// import blog_post_1 from '@assets/img/blog/blog-big-3.jpg';
// import blog_post_2 from '@assets/img/blog/blog-big-2.jpg';

// // blog grid 
// import blog_grid_1 from '@assets/img/blog/grid/blog-grid-1.jpg';
// import blog_grid_2 from '@assets/img/blog/grid/blog-grid-2.jpg';
// import blog_grid_3 from '@assets/img/blog/grid/blog-grid-3.jpg';
// import blog_grid_4 from '@assets/img/blog/grid/blog-grid-4.jpg';
// import blog_grid_5 from '@assets/img/blog/grid/blog-grid-5.jpg';

// // list img 
// import list_img_1 from '@assets/img/blog/grid/blog-grid-1.jpg';
// import list_img_2 from '@assets/img/blog/grid/blog-grid-2.jpg';
// import list_img_3 from '@assets/img/blog/grid/blog-grid-3.jpg';
// import list_img_4 from '@assets/img/blog/grid/blog-grid-4.jpg';
// import list_img_5 from '@assets/img/blog/grid/blog-grid-5.jpg';


// const blogData = [
//   {
//     id: 1,
//     img: blog_1,
//     date: "14 January, 2023",
//     author:'Mark Smith',
//     title: "The Modern Art Clay Ceramics.",
//     tags: ["Tablet", "News"],
//     category:'electronics',
//     comments:2,
//     sm_desc:
//       "The world is an amazing place providing an incredible assortment of interesting locations across.",
//     blog: "electronics",
//   },
//   {
//     id: 2,
//     img: blog_2,
//     date: "18 February, 2023",
//     author:'Naim Ahmed',
//     title: "How clothes are linked to climate",
//     tags: ["Monitor", "Technology"],
//     category:'electronics',
//     comments:4,
//     sm_desc:
//       "The world is an amazing place providing an incredible assortment of interesting locations across.",
//     blog: "electronics",
//   },
//   {
//     id: 3,
//     img: blog_3,
//     date: "20 January, 2023",
//     author:'Salim Rana',
//     title: "The Sound Of Fashion: Malcolm",
//     tags: ["Microphone", "Computer"],
//     category:'electronics',
//     comments:5,
//     sm_desc:
//       "The world is an amazing place providing an incredible assortment of interesting locations across.",
//     blog: "electronics",
//   },
//   // fashion blog
//   {
//     id: 4,
//     img: blog_4,
//     date: "20 July, 2023",
//     author:'John Smith',
//     title: "The 'Boomerang' Employees Returning After Quitting",
//     tags: ["Fashion", "Lift Style","News"],
//     category:'fashion',
//     comments:6,
//     sm_desc:
//       "The world is an amazing place providing an incredible assortment of interesting locations across.",
//     blog: "fashion",
//   },
//   {
//     id: 5,
//     img: blog_5,
//     date: "18 March, 2023",
//     author:'John Smith',
//     title: "Fast fashion: How clothes are linked to climate change",
//     tags: ["Fashion", "Lift Style","News"],
//     category:'fashion',
//     comments:3,
//     sm_desc:
//       "The world is an amazing place providing an incredible assortment of interesting locations across.",
//     blog: "fashion",
//   },
//   {
//     id: 6,
//     img: blog_6,
//     date: "15 February, 2023",
//     author:'John Smith',
//     title: "The Sound Of Fashion: Malcolm McLaren Words",
//     tags: ["Fashion", "Lift Style","News"],
//     category:'fashion',
//     comments:8,
//     sm_desc:
//       "The world is an amazing place providing an incredible assortment of interesting locations across.",
//     blog: "fashion",
//   },
//   {
//     id:8,
//     img:blog_post_2,
//     date:'April 18, 2023',
//     author:'Mark Smith',
//     comments:5,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Four Ways a Clean Workplace Makes Employees Happy and Healthy',
//     desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
//     video:true,
//     video_id:'457mlqV1gzA',
//     blog:'blog-postbox'
//   },
//   {
//     id:9,
//     date:'March 15, 2023',
//     author:'Shahnewaz Sakil',
//     comments:8,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Only one thing is impossible for God: To find any sense in any copyright law on the planet.',
//     desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
//     blockquote:true,
//     blog:'blog-postbox'
//   },
//   {
//     id:12,
//     img:blog_grid_1,
//     list_img:list_img_1,
//     date:'January 8, 2023',
//     author:'John Smith',
//     comments:5,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Hiring the Right Sales Team at the Right Time',
//     desc:'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
//     blog:'blog-grid'
//   },
//   {
//     id:13,
//     img:blog_grid_2,
//     list_img:list_img_2,
//     date:'February 12, 2023',
//     author:'Salim Rana',
//     comments:0,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Fully Embrace the Return of 90s fashion',
//     desc:'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
//     blog:'blog-grid'
//   },
//   {
//     id:14,
//     img:blog_grid_3,
//     list_img:list_img_3,
//     date:'March 15, 2023',
//     author:'John Smith',
//     comments:12,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Exploring the English Countryside',
//     desc:'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
//     blog:'blog-grid'
//   },
//   {
//     id:15,
//     img:blog_grid_4,
//     list_img:list_img_4,
//     date:'April 7, 2023',
//     author:'John Smith',
//     comments:8,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Here’s the First Valentino’s New Makeup Collection',
//     desc:'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
//     blog:'blog-grid'
//   },
//   {
//     id:16,
//     img:blog_grid_5,
//     list_img:list_img_5,
//     date:'May 2, 2023',
//     author:'John Smith',
//     comments:4,
//     tags: ["Fashion", "Lift Style","News"],
//     category:'Beauty',
//     title:'Follow Your own Design process, whatever gets',
//     desc:'Cursus mattis sociis natoque penatibus et magnis montes,nascetur ridiculus.',
//     blog:'blog-grid'
//   },
// ];

// export default blogData;
