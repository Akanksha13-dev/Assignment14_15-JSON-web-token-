import {SchemaObject} from "@loopback/rest";
export const CredentialsSchema:SchemaObject={
  type:'object',
  required:['email','password'],
  properties:{
    email:{
      type:'string',
      format:'email',
    },
    password:{
      type:'string',
      minLength:8,
    }
  }
}
export const CredentialsRequestBody={
  description:'The input for login body ',
  required:true,
  content:{
    'application/json':{schema:CredentialsSchema},

  },
};
