const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://surajgholap:srj@9604@cluster0-kmd7r.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
            .then(()=>{
                console.log("C");
            }).catch(()=>{
                console.log("E");
            });

            // srj@9604

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));