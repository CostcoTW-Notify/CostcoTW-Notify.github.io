# 台灣 Costco 線上商品情報站

支援台灣好市多線上商品的資訊監測，並且整合使用 Line Notify 發送通知  

### 請 [點此前往](http://costcotw-notify.github.io/) 網站

<br>

## 目前支援功能

1. 每日新特價商品通知 (PM 12:15 發送通知)
2. 每日新最優惠價價格商品通知 (價錢尾數為 7 的商品) ref:[新聞參考](https://tw.news.yahoo.com/costco-%E5%A5%BD%E5%B8%82%E5%A4%9A-%E6%8A%98%E6%89%A3-095726065.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAC4Es28VoAIlsAPyCeefPS4yWsMK6K2qzz7hm84tTxfxlR1f4WRzJWOiHFUXtvldGaAZtk87UlVB7c2MwWZbLUEw3s64sORiPk91CUr8VbG3h-y_LV8D14JilhBrR6heP8Ht-3igXlBkK88u6KiM-0A24PO_R6xUuFvepyzkepyh)
3. 庫存補貨通知

<br>

## 系統架構:

<br>

![Systems Architecture](https://raw.githubusercontent.com/CostcoTW-Notify/.github/72e3b0214425b5a06ab9adc81e7e8a5999a63850/profile/image/CostcoTW-Notify_SD.png)

<br>

### Repository
- [Frontend APP](https://github.com/CostcoTW-Notify/CostcoTW-Notify.github.io)

- [Line-ChatRoom-Service](https://github.com/CostcoTW-Notify/Line-ChatRoom-Service)

- [OIDC-Auth-Server](https://github.com/CostcoTW-Notify/OIDC-Server)

- [CoreService](https://github.com/CostcoTW-Notify/CostcoTW_API_Parser)

- [Line-Notify-Sender](https://github.com/CostcoTW-Notify/Line-Notify-Sender)

<br>
<br>

## Roadmap

- ~~MVP 完成~~
- Improve - 前端 RWD 優化 (針對 Mobile 裝置)
- Maintain - 補完 Unit Test
- Infra - API Gateway 導入
- Infra - GCP PUB/SUB 導入 (針對 Microservice 之間的通訊)
- Feature - 歷史價格查詢功能
- Improve - UI/UX 優化 (加入初次使用的說明等等)

<br>

歡迎貢獻此專案  
PR Welcome
