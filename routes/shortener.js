const express= require('express');
const validUrl = require('valid-url');// validate url format
const urlExists = require('url-exists');// validate url existance pinging to url

const knex=require('../db/instance');

const router = express.Router();

router.post('/new',(req,res,next)=>{
    urlExists(req.body.URL, function(err, exists) {
        if(validUrl.isWebUri(req.body.URL) && exists==true){
            knex('urls').where({
                url:req.body.URL
            }).then((data)=>{
                if(data.length==0){
                    knex('urls').insert({url: req.body.URL}).then((data)=>{
                        res.json({
                            original_url:req.body.URL,
                            short_url:data[0]
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.json({err:err})
                    })
                }else{
                    res.json({
                        original_url:data[0].url,
                        short_url:data[0].id
                    })
                }
            }).catch((err)=>{
                console.log(err);
                res.json({err:err})
            })
        }else{
            res.json({error:"invalid URL"})
        }
    });
});

router.get('/:short_url',(req,res,next)=>{
    knex('urls').where({
        id:req.params.short_url
    }).then((data)=>{
        if(data.length==0){
            res.json({error:"No url with that id"})
        }else{
            res.redirect(data[0].url);
        }
    }).catch(err=>{
        res.json({err:err});
    })
})

module.exports=router;