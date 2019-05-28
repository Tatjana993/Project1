export class Shape {
  /*  name: 'rectangle';
    popup() {
    console.log('The inside popup(): ' + this.name);
    setTimeout(function() {
    console.log('The inside setTimeout(): ' + this.name);
    console.log('The shape is a ' + this.name + '!');
    }, 3000);
    } */

    name: 'rectangle';
    popup() {
    console.log('The inside popup(): ' + this.name);
    setTimeout(() => {
    console.log('The inside setTimeout(): ' + this.name);
    console.log('The shape is a ' + this.name + '!');
    }, 3000);
    }

    }
