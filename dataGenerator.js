/*
  This generates our fake newsfeed information.

  There is no need to touch the code in here until you get to basic requirement #4,
  but please check it out to familiarize yourself beforehand.
*/
(() => {
  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};
  bacefook.friendNames = ["うめ", "源之助", "團十郎", "フネ", "正造","イネ","まさる"];
  bacefook.friendNames.forEach(name => {
    bacefook.friends[name] = [];
  });

  const getRandomElement = array => {
    // Given an array, returns a random element
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const starters = [
    "今日は",
    "昨日は",
    "20年ぶりに",
    "今週末は",
    "あれは確か４日前",
    ""
  ];
  const verbs = [
    "孫達と",
    "じぃさんと",
    "ばぁさんと",
    "せがれ達と",
    "老人会のメンバーと",
    "一人で",
    ""
  ];
  const fillers = [
    "定食屋に行ったんじゃが",
    "散歩に行ってきたんじゃが",
    "コメダ珈琲店へ行ったんじゃが",
    "大阪観光に行ったんじゃが",
    "縁側で日向ぼっこしておったんじゃが",
    "パチンコ屋に行っておったんじゃが",
    "ゲートボールをやったんじゃが",
  ];
  const nouns = [
    "天気がすこぶる良くて気持ちよかったわい🌞",
    "腰がいとぉてなんにも手に付かんかったわい💢",
    "そこで食べた寿司🍣が旨すぎて昇天しかけたわい😇",
    "財布を無くしてしもぉてどえらい目にあったわい💰",
    "横におるのが誰か分からんくなって怖かったわい😱",
    "久方ぶりだったもんで年甲斐もなく張り切ってしもぉた🤣",
  ];
  const hashtags = [
    "#ワシらまだまだ #現役",
    "#腰痛 #改善 #ヤブ医者",
    "#第2の人生 #真っ盛り",
    "#老い #悪くはない #全ては人生経験",
    "#散歩倶楽部",
    "#ところで #あんた誰だ？",
    "#全く #最近の #若者ときたら",
    ""
  ];
  const feelings = [
    "幸せじゃ😀",
    "勝ちじゃ😤",
    "😍恋しいんじゃ",
    "🤮反吐が出るんじゃ",
    "😱おそがいのう",
    "😮‍💨わずらわしいのう",
    "😬トサカにくるんじゃ",
    "😖こまるのう",
    "🤩素晴らしいのう",
    ""
  ];
  const images = [
    "001.jpg",
    "002.jpg",
    "003.jpg",
    "004.jpg",
    "005.jpg",
    "006.jpg",
    "007.jpg",
    "008.jpg",
    "009.jpg",
    "010.jpg"
  ];

  const generateRandomText = () => {
    return [
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns),
    ].join(" ");
  };

  const generatePostObj = timeOffset => {
    // if an offset is provided, make the timestamp that much older, otherwise just use the current time
    const timestamp = timeOffset
      ? new Date(new Date().getTime() - timeOffset)
      : new Date();

    return {
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      hashtags: getRandomElement(hashtags),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp
    };
  };

  const addPost = obj => {
    const friend = obj.friend;
    bacefook.friends[friend].push(obj);
    bacefook.newsfeed.push(obj);
  };

  const createPost = timeOffset => {
    const newPost = generatePostObj(timeOffset);
    addPost(newPost);
  };

  for (let i = 0; i < 10; i++) {
    // make the starting posts look like they were posted over the course of the past day
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000;
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000); // generate a new post every 3 to 8 seconds
  };

  scheduler();
})();
