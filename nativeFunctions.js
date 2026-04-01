
const orders = [
   { id: 1, user: 'Alice', amount: 120, status: 'paid' },
   { id: 2, user: 'Bob', amount: 45, status: 'pending' },
   { id: 3, user: 'Alice', amount: 200, status: 'paid' },
   { id: 4, user: 'Carl', amount: 80, status: 'failed' },
   { id: 5, user: 'Bob', amount: 55, status: 'paid' },
];

// we want to build a full summary if the table in one reduce statement
const summary = orders.reduce((acc,ord)=>{
   //1 total revunues for the paied orders only
   if(ord.status == 'paid') acc.revenues = acc.revenues + ord.amount;
   acc.bystatus[ord.status] = (acc.bystatus[ord.status] || 0) + 1;
   acc.byUser[ord.user] = (acc.byUser[ord.user] || 0) + 1;
   return acc;
},{revenues:0, bystatus:{}, byUser:{}});

console.log(summary);


const MyReduce = (arr,callback,initialValue) =>{
   let acc = initialValue;
   for (let i=0; i<arr.length;i++){
      const curr = arr[i]
      acc = callback(acc,curr,i,arr)
   }
   return acc;
}