export const chartHtmlStr = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        position: relative;
      }

      * {
        padding: 0;
        margin: 0;
      }

      #root {
        width: 100%;
        height: 100%;
      }

      #errorBox {
        position: absolute;
        width: 100%;
        top: 10px;
        left: 0;
        font-size: 20px;
        z-index: 999;
      }

      .amap-logo,
      .amap-copyright {
        display: none !important;
      }

      .workerAvatar {
        width: 60px;
        height: 60px;
      }
    </style>
    <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=mBSKa7ybmbd84x6hoXOXT4Tk9lbhQiYs"></script> -->
    <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?type=lite&v=1.0&ak=mBSKa7ybmbd84x6hoXOXT4Tk9lbhQiYs"></script> -->
    <script src="https://webapi.amap.com/maps?v=1.4.10&key=60a1ea3238ec82b3199ce7915ad7022a"></script>
  </head>

  <body>
    <div id="root"></div>
  </body>
  <script>
    var map = new AMap.Map("root", {
      resizeEnable: true
    });

    var timer = null;

    // 发送消息给rn
    function postMessageToRn(sendData) {
      window.postMessage && window.postMessage(JSON.stringify(sendData), "/");
    }
    // 报错信息
    function showError(text) {
      document.getElementById("errorBox").innerHTML = JSON.stringify(text);
    }

    window.onload = function() {
      setTimeout(function() {
        try {
          postMessageToRn({ type: "loaded" });

          document.addEventListener("message", function(e) {
            var response = JSON.parse(e.data);
            var data = response.data;
            switch (response.type) {
              case "center":
                var point = new BMap.Point(data.longitude, data.latitude);
                map.setCenter(point);

                break;
              case "initData":
                initData(data);
                break;
              default:
                break;
            }
          });
        } catch (e) {
          showError(e.message);
        }
      }, 1000);
    };
  </script>
</html>
`;
