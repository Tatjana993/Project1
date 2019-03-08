 /* function getUser(req, res) {
    console.log("USAO je u fju getUSer");
    console.log(req.headers['authorization']);
    let id = req.params.id;
    let bearer = req.headers['authorization']
    if (bearer !== undefined) {
        let token = bearer.split(' ')[1];
        jwt.verify(token, 'secretKey', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                db.getUser(id, function(data){
                    let u = JSON.stringify(data);
                    console.log(id + " " + data["iduser"] + data);
                    res.send(data);
                })
            }
    } else {
        res.sendStatus(403).JSON(status, 'Not Found');
    }
    let id = req.params.id;
    db.getUser(id, function(data){
        let u = JSON.stringify(data);
        console.log(id + " " + data["iduser"] + data);
        res.send(data);
   /*  */
    // }) 