document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); //フォーム送信をキャンセル

    const city = document.getElementById('prefecture').value;
    const apiKey = 'c87b7ada87fe8a2af57fdfbae3dbdccb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`; //?の後ろからクエリパラメータとなる。※①

    fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error('ネットワークの応答が問題です');
            }
            return response.json(); //※②
        })
        .then(data => { //ここで 'data' を受け取る※③
            const weatherResult = document.getElementById('weatherResult');  //※④
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherResult.innerHTML = `
                <h2>${data.name}の天気</h2>
                <img src="${iconUrl}" alt="天気アイコン" />
                <p>天気: ${data.weather[0].description}</p>
                <p>温度: ${data.main.temp}℃</p>
                <p>湿度: ${data.main.humidity}%</p>
                <p>風速: ${data.wind.speed}m/s</p>
                <p>標高: ${data.main.grnd_level}m</p>
            `;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>エラーが発生しました: ${error.message}</p>`;
        });
});

//※① 参照元「OpenWeatherMap API - Current weather data」
//「'」と「`」の違い …どちらも通常文字列定義に使う（テンプレートリテラル（例：${city}など）を含めることができない。バッククォートは複数に渡って可能テンプレートリテラくを含めることが可能
// 補足: ${}とは …変数名などを入れると、その値が文字列に埋め込まれる。ここではjsonデータの変数名を指定している
//※② データの引っ張り方 …レスポンスはjson形式のため「.json」を使ってJavaScriptオブジェクトとして取得
//※③「date.」とは …戻り値を「dataという名前」に設定しているだけ。fetch()によって取得したjsonデータ(return response.json();)を格納している
//※④ document(=現在表示されているhtml).getElementById(=id=weatherResultを探して「返す」メソッド)

