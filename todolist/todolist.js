const todolist=[
   {name:'make dinner',duedate:'2025-10-16'},
   {name:'play video game',duedate:'2025-10-17'}];

rendertodolist();

function rendertodolist(){
   let todolisthtml='';
   for (let i = 0 ;i<todolist.length;i++){
      const todoobject = todolist[i]
      // const name = todoobject.name;
      // const date = todoobject.duedate;
      const {name,duedate} = todoobject;
      const html = `
      <p>${name}  ${duedate}
      <button class="delete" onclick="
      todolist.splice(${i},${1});
      rendertodolist();
      ">
      Delete</button
      </p>`;
      todolisthtml+=html;
   }
   console.log(todolisthtml)
   document.querySelector('.js-todo-list').innerHTML = todolisthtml;
}

function addtodo(){
   const inputElement=document.querySelector('.js-name-input');
   const name = inputElement.value;
   const dateinputelement = document.querySelector('.js-date-input') 
   const duedate=dateinputelement.value;
   
   //we can write it like {name,duedate} if it has the same name as the property 
   todolist.push({name:name , duedate:duedate});

   //to reset the data we enter after send it to the array that we will display later 
   inputElement.value="";
   rendertodolist();
}


