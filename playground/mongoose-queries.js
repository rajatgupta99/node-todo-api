const {ObjectId}  = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/model/todo');
const {User}  = require('./../server/model/user');

// var id = '5c52975b8c1a2924784c26da1';
//
// // Todo.find({
// //   _id : id
// // }).then((result)  =>  {
// //   console.log(result);
// // }).catch((err)  =>  {
// //   console.log(err);
// // })
//
// // Todo.findOne({
// //   text: 'Go to gym!!!'
// // }).then((result)  =>  {
// //   console.log(result);
// // });
//
// if(ObjectId.isValid(id)){
//   Todo.findById(id).then((res)  =>  {
//     console.log(res);
//   }).catch((err) => {
//       console.log(err);
//   })
// }else{
//   console.log('Object ID is not vaild, please try again');
// }

var id = 'lkl';

if(ObjectId.isValid(id)){
  User.findById(id).then((res)  =>  {
    console.log(res);
  }).catch((err)  =>  {
    console.log(err);
  });
}else{
  console.log('Id is invalid');
}


mongoose.connection.close();
