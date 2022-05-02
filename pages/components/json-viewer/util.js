
 const ONE = 1;
 
 const getType = (val) => {
   return Object.prototype.toString.call(val).replace(/^\[object\s(.*)\]$/, '$1');
 };

 const hasChild = (val) => {
  let type = Object.prototype.toString.call(val).replace(/^\[object\s(.*)\]$/, '$1');
  if(type == 'Array') {
   if(val.length > 0) return true;
   else return false;
  }
  if(type == 'Object') {
   if(Object.keys(val).length > 0) return true;
   else return false;
  }
  return false;
 };
 
 module.exports = {
   getType,
   hasChild
 };
 