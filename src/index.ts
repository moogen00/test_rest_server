import express from 'express';
import themeJson from './theme.json';
import themeSmartPlayListJson1 from './theme_smartplaylist1.json';
import themeSmartPlayListJson2 from './theme_smartplaylist2.json';
import moodCategoryJson from './mood_category.json';
import moodMusicListJson from './mood_music_list.json';
import genresJson from './genres.json';
import genresMusicListJson from './genres_music_list.json';
import artistMusicListJson from './artist_music_list.json';
import combiCateJson from './combination_category.json';
import combiCateThemeJson from './combination_category_theme.json';
import combiCateThemeMusicListJson from './combination_theme_music_list.json';

// const app = express();

let app = express();

// var bodyParser = require('body-parser');


// 앞에서 express 버전 4에는 body-parser가 내장되어있다고 했지만 json을 파싱하겠다는 설정을 하지 않아서다. 상단에 아래 설정을 추가한다.
app.use(express.json())

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))


// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());


// 모든 http method 허용, 스트링 리턴
// app.get -> app.use 로 변경  

// app.use('/api/hello', (req, res) => {
//   res.send('hello world');
// })


// GET만 허용 
app.get('/api/hello2', (req, res) => {
  res.send('hello world');
})

// GET + query 파라메터로 데이터 전송
// res.send(`hello ${name}`); 홑따옴표가 아니다. ` ` 되어 있어야한다. 
app.get('/api/hello3', (req, res) => {
  const {name} = req.query;
  res.send(`hello ${name}`);
})


// GET + uri 파라메터로 데이터 전송
// uri parameter 는 /gildong 으로 보내고 key 는 server 에서 /:name 으로 받는다. 
app.get('/hello32/:name', (req, res) => {
  const {name} = req.params;
  res.send(`Hello ${name}`);
})


// POST + query 파라메터로 데이터 전송
// http://localhost:8080/hello33?name=aaaaaaaaa
app.post('/hello33', (req, res) => {
  const {name} = req.query;
  res.send(`Hello ${name}`);
})

// post 전송, x-www-form-urlencoded 방식
app.post('/hello4', (req, res) => {
  const {name} = req.body;
  res.send(`Hello ${name}`);
})



// response - json 데이터 보내기
app.post('/hello5', (req, res) => {
  const result = {
    code: 0,
    message: 'success'
  };
  res.send(result);
})

// response - json 데이터 보내기
app.post('/hello6', (req, res) => {
  console.log(req.body);
  // console.log(themeJson)
  // const ss = require(theme.json)

  const result = {
    code: 0,
    message: 'success',
    type: 'aaaaaaa',
    song: '아이유'
  };

  // const result = req.body;
  res.send(result);
  // res.json(themeJson);
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// http://221.148.44.58:8088/api/v1/dev/themes
// /api/v1/dev/themes
// response - json 데이터 보내기
// post
app.post('/api/v1/dev/themes', (req, res) => {
  console.log(req.body);
  console.log(themeJson);
  res.json(themeJson);
})

// response - json 데이터 보내기
// get
app.get('/api/v1/dev/themes', (req, res) => {
  console.log(req.body);
  console.log(themeJson);
  res.json(themeJson);
})


// http://221.148.44.58:8088/api/v1/dev/themes/smartPlayList
// response - json 데이터 보내기
// post
app.post('/api/v1/dev/themes/smartPlayList', (req, res) => {
  console.log(req.body);
  // var id = req.body.id; 
  // var age = req.body.age;
  let theme_id = req.body.theme_id;
  let limit = req.body.limit;
  let offset = req.body.offset;


  console.log('theme_id = ' + req.body.theme_id);
  console.log('limit = ' + req.body.limit);
  console.log('offset = ' + req.body.offset);

  if (theme_id === 1) {
    res.json(themeSmartPlayListJson1);
  } else if (theme_id === 2) {
    res.json(themeSmartPlayListJson2);
  } else {
    res.json({ message: "INVALID REQUEST!!!" });
  }

  // let desc_type = req.query.desc_type;
  
  // if(!desc_type) {
  //   console.log(themeSmartPlayListJson1);
  //   res.json(themeSmartPlayListJson1);
  // } else {
  //   res.json(moodMusicListJson);
  // }


})


// http://221.148.44.58:8088/api/v1/dev/descriptors?desc_type=moods
// post
app.post('/api/v1/dev/descriptors', (req, res) => {
  console.log(req.body);
  
  let desc_type = req.query.desc_type;  
  console.log('desc_type = ' + desc_type);
  if(desc_type === 'moods') {
    res.json(moodCategoryJson);
  } else if (desc_type === 'genres') {
    res.json(genresJson);
  } else {
    res.json({ message: "INVALID REQUEST!!!" });
  }
  
})

// response - json 데이터 보내기
// get
app.get('/api/v1/dev/descriptors', (req, res) => {
  console.log(req.body);

  let desc_type = req.query.desc_type;  
  console.log('desc_type = ' + desc_type);
  if(desc_type === 'moods') {
    res.json(moodCategoryJson);
  } else if (desc_type === 'genres') {
    res.json(genresJson);
  } else {
    res.json({ message: "INVALID REQUEST!!!" });
  }
})



// http://221.148.44.58:8088/api/v1/dev/descriptors/smartPlayList?desc_type=moods&id=34154
// http://221.148.44.58:8088/api/v1/dev/descriptors/smartPlayList?desc_type=genres&id=18802
// post
app.post('/api/v1/dev/descriptors/smartPlayList', (req, res) => {
  console.log(req.body);
  // console.log(moodCategoryJson)
  let desc_type = req.query.desc_type;  
  let id = req.query.id;  
  console.log('desc_type = ' + desc_type);
  console.log('id = ' + id);


  // let theme_id = req.body.theme_id;  
  let limit = req.body.limit;  
  let offset = req.body.offset;  
  console.log('limit = ' + limit);
  console.log('offset = ' + offset);

  if (desc_type === 'moods') {
    res.json(moodMusicListJson);
  } else if (desc_type === 'genres') {
    res.json(genresMusicListJson);
  } else {
    res.json({ message: "INVALID REQUEST!!!" });
  }
})

// response - json 데이터 보내기
// get
app.get('/api/v1/dev/descriptors/smartPlayList', (req, res) => {
  console.log(req.body);

  let desc_type = req.query.desc_type;  
  let id = req.query.id;  
  console.log('desc_type = ' + desc_type);
  console.log('id = ' + id);

  // let theme_id = req.body.theme_id;  
  let limit = req.body.limit;  
  let offset = req.body.offset;  
  console.log('limit = ' + limit);
  console.log('offset = ' + offset);

  if (desc_type === 'moods') {
    res.json(moodMusicListJson);
  } else if (desc_type === 'genres') {
    res.json(genresMusicListJson);
  } else {
    res.json({ message: "INVALID REQUEST!!!" });
  }
})


// http://221.148.44.58:8088/api/v1/dev/artist/smartPlayList?artist_name=아이유
// post
app.post('/api/v1/dev/artist/smartPlayList', (req, res) => {
  console.log(req.body);
  // console.log(moodCategoryJson)
  let artist_name = req.query.artist_name;    
  console.log('artist_name = ' + artist_name);

  let limit = req.body.limit;  
  let offset = req.body.offset;  
  console.log('limit = ' + limit);
  console.log('offset = ' + offset);

  if (artist_name === '아이유') {
    res.json(artistMusicListJson);
  } else {
    res.json({ message: "INVALID REQUEST!!!" });
  } 
})


// http://221.148.44.58:8088/api/v1/dev/factors
// post
app.post('/api/v1/dev/factors', (req, res) => {
  console.log(req.body);  
  res.json(combiCateJson)
  
})

// response - json 데이터 보내기
// get
app.get('/api/v1/dev/factors', (req, res) => {
  console.log(req.body);  
  res.json(combiCateJson)
})


// http://221.148.44.58:8088/api/v1/dev/factors/pl_themes?timeSlot=1&destination=9&tripTime=24
// post
app.post('/api/v1/dev/factors/pl_themes', (req, res) => {
  console.log(req.body);

  let timeslot = req.query.timeslot;
  let destination = req.query.destination;
  let tripTime = req.query.tripTime;

  console.log('timeslot = ' + timeslot)
  console.log('destination = ' + destination)
  console.log('tripTime = ' + tripTime)
  
  res.json(combiCateThemeJson)  
})

// response - json 데이터 보내기
// get
app.get('/api/v1/dev/factors/pl_themes', (req, res) => {
  console.log(req.body);

  let timeslot = req.query.timeslot;
  let destination = req.query.destination;
  let tripTime = req.query.tripTime;

  console.log('timeslot = ' + timeslot)
  console.log('destination = ' + destination)
  console.log('tripTime = ' + tripTime)

  res.json(combiCateThemeJson)
})


// http://221.148.44.58:8088/api/v1/dev/factors/smartPlayList?pl_theme_id=5
// post
app.post('/api/v1/dev/factors/smartPlayList', (req, res) => {
  console.log(req.body);
  let pl_theme_id = req.query.pl_theme_id;  
    console.log('pl_theme_id = ' + pl_theme_id)
  res.json(combiCateThemeMusicListJson)
  
})


// http://localhost:8088/api/v1/dev/themes
// http://localhost:8088/api/v1/dev/themes/smartPlayList

// http://localhost:8088/api/v1/dev/descriptors?desc_type=moods
// http://localhost:8088/api/v1/dev/descriptors/smartPlayList?desc_type=moods&id=34154
// http://localhost:8088/api/v1/dev/descriptors?desc_type=genres
// http://localhost:8088/api/v1/dev/descriptors/smartPlayList?desc_type=genres&id=18802

// http://localhost:8088/api/v1/dev/artist/smartPlayList?artist_name=아이유

// http://localhost:8088/api/v1/dev/factors
// http://localhost:8088/api/v1/dev/factors/pl_themes?timeSlot=1&destination=9&tripTime=24
// http://localhost:8088/api/v1/dev/factors/smartPlayList?pl_theme_id=5




app.listen(8088, () => {
  console.log('server is listening 8088');
});
