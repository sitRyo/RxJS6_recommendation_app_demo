# Github User Recommendation App
RxJS4で解説されていた[あなたが求めていたリアクティブプログラミング入門](https://ninjinkun.hatenablog.com/entry/introrxja)をRxJS6で書き直したもの。

`webpack + js + RxJS6`

## webpackを使う理由
クライアントコードでnodemodulesをrequireできない。
BrowserfyやRequireJSなどのクライアントでnodeのライブラリを使うパッケージも存在するが、webpackがデファクトスタンダード感あるので採用。
cdnを使っても良いが、npmからDLする方が個人的に慣れているのでnodemodulesを使う。

### Memo
Observable: 時間の経過とともに到着するストリームやデータのソースを表す。
Observableは単体では何もしない。ストリームやデータを抽出・観測するための方法が必要。
**Streamは処理を格納するキュー。operationはそのキューに対して色々処理を行う。**

Observable api:
  * fromEvent: イベントのストリームを表す。
  * of: データソースを表す。
  * combineLatest: 2つのObservableから新しいObservableを作る。

Subscription: 観測可能な"動き"全てを表す。イメージとしては水道管に蛇口を取り付けて水の流れを取得するようなもの。
流れに対して操作を行う、処理実態。処理はCallbackで書く。
pipeの返り値はデータソースだったりするので、再びObservableにすることができる。

Observer: 取り付けられた蛇口。

Operation: Observableを操作するapi群。

### 参考文献
[RxJS](https://rxjs-dev.firebaseapp.com/)
[Learn RxJS](https://www.learnrxjs.io/)
