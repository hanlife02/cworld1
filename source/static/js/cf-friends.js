fetch("static/cf-friends.json")
  .then((res) => res.json())
  .then((data) => {
    var str = "";
    data.friends.forEach(function (friend) {
      str += `<li>
    <p><img src="${friend.avatar}" alt="" loading="lazy" class="φbp"></p>
    <ul>
    <li>${friend.title}</li>
    <li>${friend.intro}</li>
    <li><a href="${friend.link}" target="_blank"></a></li>
    </ul>
    </li>`;
    });
    document.querySelector("#f.cf-friends ul").innerHTML = str;
  });