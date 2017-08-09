
let Utils = {};

Utils.validateNote = (title,description,callback)=>{

var message = "";

  if(title=='' && description=='')
  {
    message = "Please enter titlte and description of the note.";
    callback({status:false,errorMessage:message});
  }
  else if (title=='') {
    message = "Please enter title of the Note";
    callback({status:false,errorMessage:message});
  }
  else if (description=='') {
    message = "Please enter Description of the Note";
    callback({status:false,errorMessage:message});
  }
  else {
    message = "Validation succefully";
    callback({status:true,successMessage:message});
  }
};

module.exports = Utils;
