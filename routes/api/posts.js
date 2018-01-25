var express = require('express'),
  bodyParser = require('body-parser'),
  Post = require('../../models/post'),
  router = express.Router();

router.get('/', function(req, res){

  Post.find({},function(err, posts){
    if(err){
      return res.json({'success':false, 'error': err});
    }
    return res.json({'success':true, 'posts': posts});
  });

});

router.get('/view/:slug', function(req,res){

  var slug = req.params.slug;

  Post.findOne({'slug':slug}, function(err, post){

    if(err){
      return res.json({'success':false, 'error': err});
    }

    return res.json({'success':true, 'post': post});

  });

});


router.post('/create', function(req, res) {

  Post.create(new Post({
    title: req.body.title,
    body: req.body.body,
    description: req.body.description,
    keywords: req.body.keywords,
    published: req.body.published
  }), function(err, post){
    if(err){
      return res.json({success: false, post: req.body, error: err});
    }

    return res.json({success: true, post: post});
  });

});

router.post('/edit', function(req, res){

  Post.findOne({'_id': req.body._id}, function(err, post){

    if(err) {
      return res.json({success: false, error: err});
    }

    if(post) {

      let data = req.body;

      post.title =req.body.title;
      post.body=req.body.body;
      post.description=req.body.description;
      post.keywords=req.body.keywords;
      post.published=req.body.published;

      post.save(function(err){
        if(err){
          return res.json({success: false, error: err});
        }else{
          return res.json({success: true, post:post});
        }

      });
    }

  });
});

router.get('/delete/:postId', function(req,res){

  var postId = req.params.postId;
  Post.remove({'_id':postId}, function(err,removed){
    if(err){
      return res.json({success: false, error: err});
    }

    return res.json({success: true, status: removed});

  });
});

module.exports = router;
