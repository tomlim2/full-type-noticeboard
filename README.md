# Full-Type 게시판 프로젝트

마지막 업데이트: 2021-01-19

## 1.기술스택

- frontend
  - react
  - typescript
  - `recoil`
  - `webpack`
- backend
  - `node.js`
  - typescript
  - `express.js`

## 2.구현기능 목록

### (1) 게시글 목록

<img width="1412" alt="Screen Shot 2022-01-19 at 4 38 23 PM" src="https://user-images.githubusercontent.com/22067260/150086014-4d8cbe0a-68fc-4db7-9607-81d2f670749a.png">

- `글번호 / 제목 / 작성자 / 작성일` 등의 정보를 볼 수 있다

![Zum_0](https://user-images.githubusercontent.com/22067260/150115373-f5f35610-795b-45c8-a939-c9e641208b2f.gif)

- 게시물을 클릭하면 해당 상세 페이지로 이동한다

![Zum_1](https://user-images.githubusercontent.com/22067260/150115415-f5c2f6df-b8b2-44ee-b974-c3d1fed6a34a.gif)

- 게시물을 검색할 수 있다.

![Zum_2](https://user-images.githubusercontent.com/22067260/150115431-7b30ac92-99f3-4d10-aa19-d9911e9c1476.gif)

- 작성일을 기준으로 내림차순/오름차순 정렬이 가능하다.

![Zum_3_searchByAuthor](https://user-images.githubusercontent.com/22067260/150116958-6da223d3-6c48-43ff-a4e7-7aab629a4c7a.gif)

- 작성자를 클릭했을 때, 작성자가 작성한 게시물만 조회할 수 있다.
- 초기화 버튼이 존재하며, 해당 버튼을 클릭할 경우 정렬/검색 등이 초기화된다.

![Zum_4](https://user-images.githubusercontent.com/22067260/150115457-976b7f20-8ae2-47e8-a8cf-56d4c505773c.gif)

- 게시물 페이지네이션이 가능하며, 한 페이지에 볼 수 있는 게시물의 갯수를 선택하거나 입력하는 영역이 존재한다.


### (2) 게시글 조회

![Zum_6](https://user-images.githubusercontent.com/22067260/150115464-23686213-b3c2-4283-81c8-27b663920823.gif)

- `글번호 / 제목 / 내용 / 작성자 / 작성일` 등의 정보를 볼 수 있다.
- `수정 / 삭제 / 목록` **버튼** 이 존재한다.
- `수정`을 **클릭**시 수정 페이지로 이동한다.
  - 수정 페이지로 이동하는 경우, 해당 게시글의 내용이 기본적으로 입력된 상태로 보여져야 한다.

![Zum_7_delete](https://user-images.githubusercontent.com/22067260/150117727-a9403033-b426-479f-b1b9-61cb0eba7763.gif)

- `삭제`를 **클릭**시 게시글이 삭제된다.
- `목록`을 **클릭**시 목록 버튼으로 이동한다.

![Zum_8_404](https://user-images.githubusercontent.com/22067260/150117741-3d01ddab-7f13-4a13-959b-fb25232e440f.gif)

- 404 페이지
  - 없는 게시물을 조회할 경우에 대한 이동한다.

### (3) 게시글 작성/수정

![Zum_5](https://user-images.githubusercontent.com/22067260/150115461-98545117-0621-4b3a-a3c6-c22e851510a0.gif)

- `제목 / 내용` 등을 입력할 수 있는 input이 있다.
- input을 채운 후 `전송 버튼`을 클릭할 경우 게시물이 작성(수정) 된다.
- 게시글 작성이 완료되면 자동으로 해당 게시물을 조회하는 페이지로 이동한다.

### (4) API 오류 관련

- 4XX, 5XX status에 대한 응답이 내려올 경우에 대한 UI 처리가 존재한다.
  - 없는 페이지로 접근할 경우 404 페이지를 만들고 500 관련 에러가 발생할 경우, 에러에 대한 메세지를 띄워준다.

### (5) 유저 정보 전역화

- recoil을 사용하여 구현하였습니다.


## 3.실행방법

back-end 폴더에서

```text
./back-end

npm install
npm start
```

front-end 폴더에서

```text
./front-end

npm install
npm run start
```

### build

프론트 엔드 프러덕션 빌드 커멘드는 front-end 폴더에 가서

```text
./front-end

npm run build
```
