let login = 0;
window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  if (!username) {
    // Prompt for one if a username isn't found
    username = prompt("名前を入力して下さい", "例）加藤　一二三");

if (username === '') {
	alert('何も入力されとらんよ？');
} else if (username === null) {
	alert('キャンセルしました');
} else {
  alert('🎵入場完了です🎵');
  localStorage.setItem("username", username);
  login = 1;
}
  }
  const usernameEl = document.querySelector("#username");
  const addUsername = document.createElement("div");
  if(login === 1){
    addUsername.innerText = localStorage.username;
    usernameEl.append(addUsername);
  }else{
    addUsername.innerText = "⇩『入場』ボタンを押して名前を入力してね"
  }
  readPost();
  console.log(login);
})

const getRandomElement = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

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

function onclickSample() {
  const containerEl = document.querySelector("#newsfeed");
  if (containerEl !== null) {
    containerEl.textContent = "";
  }
  readPost()
}

function formClick() {
  if (login === 1) {
    let userName = document.getElementById("username")
    userName = userName.firstElementChild.innerText;
    let textArea = document.getElementById("userpost").value
    let formSelect = document.getElementById("feeling").value
    const formPost = {
      friend: userName,
      text: textArea,
      hashtags: "",
      feeling: formSelect,
      image: getRandomElement(images),
      timestamp: new Date()
    };
    bacefook.newsfeed.push(formPost);

    document.getElementById("userpost").value = "";
    document.getElementById("feeling").value = "";
    onclickSample();
  } else {
    window.alert('『入場』ボタンを押して名前を入力するのじゃ！');
  }
}

function readPost() {
  console.log("read!")
  const containerEl = document.querySelector("#newsfeed");
  if (login === 1) {
    for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
      const post = bacefook.newsfeed[index];

      const friendEl = document.createElement("div");
      friendEl.className = "friend";
      friendEl.innerText = post.friend;
      const postEl = document.createElement("div");
      postEl.innerText = post.text;
      const hashtagsEl = document.createElement("div");
      hashtagsEl.innerText = post.hashtags;
      postEl.append(hashtagsEl);
      postEl.append(friendEl);
      containerEl.append(postEl);
      const feelingEl = document.createElement("div");
      feelingEl.innerText = post.feeling;
      postEl.append(feelingEl);
      // // 参考　https://gray-code.com/javascript/create-new-img-element/
      // // img要素を作成
      const imgEl = document.createElement('img');
      imgEl.src = `images/${post.image}`; // 画像パス
      imgEl.alt = '画像'; // 代替テキスト
      imgEl.width = 250; // 横サイズ（px）
      imgEl.height = 200; // 縦サイズ（px）
      postEl.append(imgEl); // 指定した要素にimg要素を挿入
      const timeStampEl = document.createElement("div");

      let postDate = moment(post.timestamp, "YYYYMMDD");
      const nowDate = moment(new Date(), "YYYYMMDD");
      const fomPostDate = postDate.format('YYYY年MM月DD日 HH:mm:ss dddd');
      const elpTime = nowDate.diff(postDate, "HH:mm");

      if (elpTime > 604800000) {
        timeStampEl.innerText = fomPostDate
      } else if (elpTime > 86400000) {
        timeStampEl.innerText = Math.floor((elpTime / 86400000)) + "日前の投稿"
      } else if (elpTime > 3600000) {
        timeStampEl.innerText = Math.floor((elpTime / 3600000)) + "時間前の投稿"
      } else if (elpTime > 60000) {
        timeStampEl.innerText = Math.floor((elpTime / 60000)) + "分前の投稿"
      } else if (elpTime > 10000) {
        timeStampEl.innerText = Math.floor((elpTime / 1000)) + "秒前の投稿"
      } else {
        timeStampEl.innerText = "たった今の投稿"
      }

      postEl.append(timeStampEl);
      postEl.id = "post"
      containerEl.append(postEl);
    }
  }
}

function logoutClick() {
  localStorage.clear();
  const containerEl = document.querySelector("#newsfeed");
  const usernameEl = document.querySelector("#username");
  usernameEl.textContent = "";
  containerEl.textContent = "";
  login = 0;
  readPost()
}

function loginClick(){
  let username = localStorage.getItem("username");
  if(login === 0 || username === null){
    window.location.reload();
  }
}

const scheduler = () => {
  console.log(login);
  setTimeout(scheduler, 10000);
  onclickSample();
};

scheduler();

;
