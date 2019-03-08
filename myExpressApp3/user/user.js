 function User (first_name, last_name, username, phone, email, password, role){
     this.first_name = first_name;
     this.last_name = last_name;
     this.username = username;
     this.phone = phone;
     this.email = email;
     this.password = password;
     this.role = role;
 } ;

/*function User(iduser, first_name, last_name, username, phone, email, password){
    this.iduser = iduser;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.phone = phone;
    this.email = email;
    this.password = password;
}*/


 module.exports = User;
 
