exports.index = (req,res) =>{
    res.send("Welcome to the Mca \n");
};

exports.show = (req,res) =>{
    res.send(`show data ${req.params.id}\n`);
};

exports.store = (req,res) =>{
    res.send(`data inserted ${req.body.name},${req.body.city} \n`);
};

exports.update = (req,res) =>{
    res.send(`data updated ${req.params.id},Name: ${req.body.name},City:${req.body.city}\n`);
};

exports.delete = (req,res) =>{
    res.send(`data  deleted ${req.params.id}\n`);
};
